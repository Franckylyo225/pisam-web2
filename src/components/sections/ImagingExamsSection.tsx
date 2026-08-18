import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, CheckCircle, Phone, Loader2 } from "lucide-react";

type Exam = {
  id: string;
  name: string;
  modality: string;
  description: string | null;
  preparation: string | null;
};

export const MODALITY_LABELS: Record<string, string> = {
  RADIO: "Radiologie",
  ECHOGRAPHIE: "Échographie",
  SCANNER: "Scanner",
  IRM: "IRM",
};

const MODALITY_ORDER = ["RADIO", "ECHOGRAPHIE", "SCANNER", "IRM"];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const ImagingExamsSection = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modality, setModality] = useState<string>("ALL");
  const [openValues, setOpenValues] = useState<string[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      const { data, error } = await supabase
        .from("imaging_exams")
        .select("id, name, modality, description, preparation")
        .eq("is_active", true)
        .order("modality")
        .order("display_order");

      if (!error && data) setExams(data as Exam[]);
      setLoading(false);
    };
    fetchExams();
  }, []);

  const countsByModality = useMemo(() => {
    return exams.reduce<Record<string, number>>((acc, exam) => {
      acc[exam.modality] = (acc[exam.modality] ?? 0) + 1;
      return acc;
    }, {});
  }, [exams]);

  const filtered = useMemo(() => {
    const term = normalize(search.trim());
    return exams.filter((exam) => {
      const matchModality =
        !term && (modality === "ALL" || exam.modality === modality);
      const matchSearch =
        !term ||
        normalize(
          `${exam.name} ${MODALITY_LABELS[exam.modality] ?? exam.modality} ${exam.description ?? ""}`
        ).includes(term);
      return matchModality && matchSearch;
    });
  }, [exams, search, modality]);

  const grouped = useMemo(() => {
    return MODALITY_ORDER.map((key) => ({
      key,
      label: MODALITY_LABELS[key],
      items: filtered.filter((exam) => exam.modality === key),
    })).filter((group) => group.items.length > 0);
  }, [filtered]);

  useEffect(() => {
    setOpenValues((current) => {
      const visibleKeys = grouped.map((group) => group.key);
      return current.filter((key) => visibleKeys.includes(key));
    });
  }, [grouped]);

  return (
    <section className="py-16 bg-background" id="examens">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos examens
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {loading
                ? "Chargement du catalogue des examens…"
                : `${exams.length} examens disponibles au centre d'imagerie CISAM, en radiologie, échographie, scanner et IRM.`}
            </p>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un examen (genou, crâne, IRM…)"
              className="pl-9 h-12"
              aria-label="Rechercher un examen d'imagerie"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <button type="button" onClick={() => setModality("ALL")}>
              <Badge
                variant={modality === "ALL" ? "default" : "outline"}
                className="cursor-pointer px-3 py-1.5 text-sm"
              >
                Tous ({exams.length})
              </Badge>
            </button>
            {MODALITY_ORDER.filter((key) => countsByModality[key]).map((key) => (
              <button type="button" key={key} onClick={() => setModality(key)}>
                <Badge
                  variant={modality === key ? "default" : "outline"}
                  className="cursor-pointer px-3 py-1.5 text-sm"
                >
                  {MODALITY_LABELS[key]} ({countsByModality[key]})
                </Badge>
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-secondary" />
            </div>
          ) : grouped.length === 0 ? (
            <div className="text-center py-12 rounded-lg bg-muted/40 border border-border/50">
              <p className="text-foreground font-medium mb-2">
                Aucun examen ne correspond à votre recherche
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                Appelez-nous, notre équipe vous renseignera sur la disponibilité de l'examen.
              </p>
              <Button asChild variant="secondary">
                <a href="tel:+2252722483115">
                  <Phone className="h-4 w-4 mr-2" />
                  27 22 48 31 15
                </a>
              </Button>
            </div>
          ) : (
            <Accordion
              type="multiple"
              value={openValues}
              onValueChange={setOpenValues}
              className="space-y-3"
            >
              {grouped.map((group) => (
                <AccordionItem
                  key={group.key}
                  value={group.key}
                  className="border border-border/60 rounded-lg px-4 bg-card"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <span className="font-proxima font-semibold text-foreground text-left">
                      {group.label}{" "}
                      <span className="text-muted-foreground font-normal">
                        ({group.items.length})
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 pb-2">
                      {group.items.map((exam) => (
                        <li
                          key={exam.id}
                          className="flex items-start gap-2 p-3 rounded-md bg-muted/50 border border-border/40"
                        >
                          <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                          <div>
                            <span className="text-sm text-foreground font-medium">
                              {exam.name}
                            </span>
                            {exam.description && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {exam.description}
                              </p>
                            )}
                            {exam.preparation && (
                              <p className="text-xs text-muted-foreground mt-1">
                                <span className="font-medium">Préparation :</span>{" "}
                                {exam.preparation}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          <div className="mt-8 p-6 rounded-lg bg-muted/40 border border-border/50 text-center">
            <p className="text-foreground font-medium mb-1">
              Les tarifs vous sont communiqués lors de la prise de rendez-vous
            </p>
            <p className="text-muted-foreground text-sm mb-4">
              La plupart des examens de radiologie et d'échographie se font sans rendez-vous.
            </p>
            <Button asChild variant="secondary">
              <a href="tel:+2252722483115">
                <Phone className="h-4 w-4 mr-2" />
                Appeler le 27 22 48 31 15
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImagingExamsSection;
