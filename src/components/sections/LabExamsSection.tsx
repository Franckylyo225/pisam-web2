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

type LabExam = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  preparation: string | null;
};

export const LAB_CATEGORY_LABELS: Record<string, string> = {
  BIOCHIMIE: "Biochimie",
  HEMATOLOGIE: "Hématologie",
  SEROLOGIE: "Sérologie & Immunologie",
  MICROBIOLOGIE: "Microbiologie & Parasitologie",
  HORMONOLOGIE: "Hormonologie & marqueurs tumoraux",
  CYTOLOGIE: "Cytologie & Anatomie pathologique",
};

const CATEGORY_ORDER = [
  "BIOCHIMIE",
  "HEMATOLOGIE",
  "SEROLOGIE",
  "MICROBIOLOGIE",
  "HORMONOLOGIE",
  "CYTOLOGIE",
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const LabExamsSection = () => {
  const [exams, setExams] = useState<LabExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("ALL");
  const [openValues, setOpenValues] = useState<string[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      const { data, error } = await supabase
        .from("lab_exams")
        .select("id, name, category, description, preparation")
        .eq("is_active", true)
        .order("category")
        .order("display_order");

      if (!error && data) setExams(data as LabExam[]);
      setLoading(false);
    };
    fetchExams();
  }, []);

  const countsByCategory = useMemo(() => {
    return exams.reduce<Record<string, number>>((acc, exam) => {
      acc[exam.category] = (acc[exam.category] ?? 0) + 1;
      return acc;
    }, {});
  }, [exams]);

  const filtered = useMemo(() => {
    const term = normalize(search.trim());
    return exams.filter((exam) => {
      const matchCategory = category === "ALL" || exam.category === category;
      if (!matchCategory) return false;
      if (!term) return true;
      const haystack = normalize(
        `${exam.name} ${LAB_CATEGORY_LABELS[exam.category] ?? exam.category} ${exam.description ?? ""}`
      );
      return haystack.includes(term);
    });
  }, [exams, search, category]);

  const grouped = useMemo(() => {
    const known = CATEGORY_ORDER.map((key) => ({
      key,
      label: LAB_CATEGORY_LABELS[key] ?? key,
      items: filtered.filter((exam) => exam.category === key),
    }));
    const others = Array.from(
      new Set(filtered.map((exam) => exam.category).filter((key) => !CATEGORY_ORDER.includes(key)))
    ).map((key) => ({
      key,
      label: LAB_CATEGORY_LABELS[key] ?? key,
      items: filtered.filter((exam) => exam.category === key),
    }));
    return [...known, ...others].filter((group) => group.items.length > 0);
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
              Les examens disponibles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {loading
                ? "Chargement du catalogue des analyses…"
                : `${exams.length} analyses réalisées au laboratoire BioCSAM, en biochimie, hématologie, sérologie, microbiologie et hormonologie.`}
            </p>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher une analyse (glycémie, TSH, ECBU…)"
              className="pl-9 h-12"
              aria-label="Rechercher une analyse de laboratoire"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <button type="button" onClick={() => setCategory("ALL")}>
              <Badge
                variant={category === "ALL" ? "default" : "outline"}
                className="cursor-pointer px-3 py-1.5 text-sm"
              >
                Tous ({exams.length})
              </Badge>
            </button>
            {CATEGORY_ORDER.filter((key) => countsByCategory[key]).map((key) => (
              <button type="button" key={key} onClick={() => setCategory(key)}>
                <Badge
                  variant={category === key ? "default" : "outline"}
                  className="cursor-pointer px-3 py-1.5 text-sm"
                >
                  {LAB_CATEGORY_LABELS[key]} ({countsByCategory[key]})
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
                Aucune analyse ne correspond à votre recherche
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                Appelez-nous, notre équipe vous renseignera sur la disponibilité de l'analyse.
              </p>
              <Button asChild variant="secondary">
                <a href="tel:+2252722483123">
                  <Phone className="h-4 w-4 mr-2" />
                  27 22 48 31 23
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
              Les tarifs vous sont communiqués au secrétariat du laboratoire
            </p>
            <p className="text-muted-foreground text-sm mb-4">
              La plupart des analyses se font sur prescription médicale, sans rendez-vous.
            </p>
            <Button asChild variant="secondary">
              <a href="tel:+2252722483123">
                <Phone className="h-4 w-4 mr-2" />
                Appeler le 27 22 48 31 23
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabExamsSection;