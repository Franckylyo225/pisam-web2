import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Search } from "lucide-react";

type LabExam = {
  id: string;
  name: string;
  category: string;
  b_value: number | null;
  description: string | null;
  preparation: string | null;
  display_order: number;
  is_active: boolean;
};

const CATEGORIES = [
  { value: "BIOCHIMIE", label: "Biochimie" },
  { value: "HEMATOLOGIE", label: "Hématologie" },
  { value: "SEROLOGIE", label: "Sérologie & Immunologie" },
  { value: "MICROBIOLOGIE", label: "Microbiologie & Parasitologie" },
  { value: "HORMONOLOGIE", label: "Hormonologie & marqueurs tumoraux" },
  { value: "CYTOLOGIE", label: "Cytologie & Anatomie pathologique" },
];

const labelOf = (value: string) =>
  CATEGORIES.find((item) => item.value === value)?.label ?? value;

const emptyForm = {
  name: "",
  category: "BIOCHIMIE",
  b_value: "",
  description: "",
  preparation: "",
  display_order: 0,
  is_active: true,
};

export default function LabExamsManager() {
  const [exams, setExams] = useState<LabExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchExams = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lab_exams")
      .select("*")
      .order("category")
      .order("display_order");
    if (error) {
      toast.error("Impossible de charger les analyses");
    } else {
      setExams((data ?? []) as LabExam[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return exams.filter((exam) => {
      if (categoryFilter !== "ALL" && exam.category !== categoryFilter) return false;
      if (!term) return true;
      return exam.name.toLowerCase().includes(term);
    });
  }, [exams, search, categoryFilter]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setDialogOpen(true);
  };

  const openEdit = (exam: LabExam) => {
    setEditingId(exam.id);
    setForm({
      name: exam.name,
      category: exam.category,
      b_value: exam.b_value === null ? "" : String(exam.b_value),
      description: exam.description ?? "",
      preparation: exam.preparation ?? "",
      display_order: exam.display_order,
      is_active: exam.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Le nom de l'analyse est obligatoire");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      category: form.category,
      b_value: form.b_value.trim() === "" ? null : Number(form.b_value),
      description: form.description.trim() || null,
      preparation: form.preparation.trim() || null,
      display_order: Number(form.display_order) || 0,
      is_active: form.is_active,
    };

    const { error } = editingId
      ? await supabase.from("lab_exams").update(payload).eq("id", editingId)
      : await supabase.from("lab_exams").insert(payload);

    setSaving(false);

    if (error) {
      if (error.code === "23505") {
        toast.error("Cette analyse existe déjà");
      } else {
        toast.error("Erreur lors de l'enregistrement");
      }
      return;
    }

    toast.success(editingId ? "Analyse mise à jour" : "Analyse ajoutée");
    setDialogOpen(false);
    fetchExams();
  };

  const toggleActive = async (exam: LabExam) => {
    const { error } = await supabase
      .from("lab_exams")
      .update({ is_active: !exam.is_active })
      .eq("id", exam.id);
    if (error) {
      toast.error("Erreur lors de la mise à jour");
      return;
    }
    setExams((prev) =>
      prev.map((item) =>
        item.id === exam.id ? { ...item, is_active: !item.is_active } : item
      )
    );
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("lab_exams").delete().eq("id", deleteId);
    if (error) {
      toast.error("Suppression impossible");
    } else {
      toast.success("Analyse supprimée");
      setExams((prev) => prev.filter((item) => item.id !== deleteId));
    }
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une analyse
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher une analyse…"
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="sm:w-72">
                <SelectValue placeholder="Discipline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Toutes les disciplines</SelectItem>
                {CATEGORIES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground">
            {filtered.length} analyse(s) affichée(s) sur {exams.length}
          </p>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Analyse</TableHead>
                    <TableHead>Discipline</TableHead>
                    <TableHead className="w-20">Cotation B</TableHead>
                    <TableHead className="w-20">Ordre</TableHead>
                    <TableHead className="w-24">Actif</TableHead>
                    <TableHead className="w-28 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>
                        <div className="font-medium">{exam.name}</div>
                        {exam.description && (
                          <div className="text-xs text-muted-foreground">
                            {exam.description}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{labelOf(exam.category)}</Badge>
                      </TableCell>
                      <TableCell>{exam.b_value ?? "—"}</TableCell>
                      <TableCell>{exam.display_order}</TableCell>
                      <TableCell>
                        <Switch
                          checked={exam.is_active}
                          onCheckedChange={() => toggleActive(exam)}
                        />
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(exam)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(exam.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        Aucune analyse trouvée
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Modifier l'analyse" : "Ajouter une analyse"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lab-name">Nom de l'analyse *</Label>
              <Input
                id="lab-name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Ex : Glycémie"
              />
            </div>
            <div className="space-y-2">
              <Label>Discipline *</Label>
              <Select
                value={form.category}
                onValueChange={(value) => setForm({ ...form, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lab-b">Cotation B (optionnel)</Label>
              <Input
                id="lab-b"
                type="number"
                className="w-32"
                value={form.b_value}
                onChange={(event) => setForm({ ...form, b_value: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lab-description">Description (optionnel)</Label>
              <Textarea
                id="lab-description"
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lab-preparation">Préparation (optionnel)</Label>
              <Textarea
                id="lab-preparation"
                value={form.preparation}
                onChange={(event) =>
                  setForm({ ...form, preparation: event.target.value })
                }
                rows={2}
                placeholder="Ex : à jeun depuis 12 heures"
              />
            </div>
            <div className="flex items-center gap-6">
              <div className="space-y-2">
                <Label htmlFor="lab-order">Ordre d'affichage</Label>
                <Input
                  id="lab-order"
                  type="number"
                  className="w-28"
                  value={form.display_order}
                  onChange={(event) =>
                    setForm({ ...form, display_order: Number(event.target.value) })
                  }
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  id="lab-active"
                  checked={form.is_active}
                  onCheckedChange={(checked) => setForm({ ...form, is_active: checked })}
                />
                <Label htmlFor="lab-active">Visible sur le site</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette analyse ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est définitive. L'analyse n'apparaîtra plus sur la page BioCSAM.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}