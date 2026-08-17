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

type Exam = {
  id: string;
  name: string;
  modality: string;
  description: string | null;
  preparation: string | null;
  display_order: number;
  is_active: boolean;
};

const MODALITIES = [
  { value: "RADIO", label: "Radiologie" },
  { value: "ECHOGRAPHIE", label: "Échographie" },
  { value: "SCANNER", label: "Scanner" },
  { value: "IRM", label: "IRM" },
];

const labelOf = (value: string) =>
  MODALITIES.find((item) => item.value === value)?.label ?? value;

const emptyForm = {
  name: "",
  modality: "RADIO",
  description: "",
  preparation: "",
  display_order: 0,
  is_active: true,
};

export default function ImagingExamsAdmin() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [modalityFilter, setModalityFilter] = useState("ALL");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchExams = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("imaging_exams")
      .select("*")
      .order("modality")
      .order("display_order");
    if (error) {
      toast.error("Impossible de charger les examens");
    } else {
      setExams((data ?? []) as Exam[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return exams.filter((exam) => {
      if (modalityFilter !== "ALL" && exam.modality !== modalityFilter) return false;
      if (!term) return true;
      return exam.name.toLowerCase().includes(term);
    });
  }, [exams, search, modalityFilter]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setDialogOpen(true);
  };

  const openEdit = (exam: Exam) => {
    setEditingId(exam.id);
    setForm({
      name: exam.name,
      modality: exam.modality,
      description: exam.description ?? "",
      preparation: exam.preparation ?? "",
      display_order: exam.display_order,
      is_active: exam.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Le nom de l'examen est obligatoire");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      modality: form.modality,
      description: form.description.trim() || null,
      preparation: form.preparation.trim() || null,
      display_order: Number(form.display_order) || 0,
      is_active: form.is_active,
    };

    const { error } = editingId
      ? await supabase.from("imaging_exams").update(payload).eq("id", editingId)
      : await supabase.from("imaging_exams").insert(payload);

    setSaving(false);

    if (error) {
      if (error.code === "23505") {
        toast.error("Cet examen existe déjà dans cette modalité");
      } else {
        toast.error("Erreur lors de l'enregistrement");
      }
      return;
    }

    toast.success(editingId ? "Examen mis à jour" : "Examen ajouté");
    setDialogOpen(false);
    fetchExams();
  };

  const toggleActive = async (exam: Exam) => {
    const { error } = await supabase
      .from("imaging_exams")
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
    const { error } = await supabase.from("imaging_exams").delete().eq("id", deleteId);
    if (error) {
      toast.error("Suppression impossible");
    } else {
      toast.success("Examen supprimé");
      setExams((prev) => prev.filter((item) => item.id !== deleteId));
    }
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Examens d'imagerie</h1>
          <p className="text-muted-foreground">
            Gérez le catalogue d'examens affiché sur la page CISAM.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un examen
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
                placeholder="Rechercher un examen…"
                className="pl-9"
              />
            </div>
            <Select value={modalityFilter} onValueChange={setModalityFilter}>
              <SelectTrigger className="sm:w-56">
                <SelectValue placeholder="Modalité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Toutes les modalités</SelectItem>
                {MODALITIES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground">
            {filtered.length} examen(s) affiché(s) sur {exams.length}
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
                    <TableHead>Examen</TableHead>
                    <TableHead>Modalité</TableHead>
                    <TableHead className="w-24">Ordre</TableHead>
                    <TableHead className="w-28">Actif</TableHead>
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
                        <Badge variant="outline">{labelOf(exam.modality)}</Badge>
                      </TableCell>
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
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        Aucun examen trouvé
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
              {editingId ? "Modifier l'examen" : "Ajouter un examen"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="exam-name">Nom de l'examen *</Label>
              <Input
                id="exam-name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Ex : IRM Genou"
              />
            </div>
            <div className="space-y-2">
              <Label>Modalité *</Label>
              <Select
                value={form.modality}
                onValueChange={(value) => setForm({ ...form, modality: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MODALITIES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="exam-description">Description (optionnel)</Label>
              <Textarea
                id="exam-description"
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exam-preparation">Préparation (optionnel)</Label>
              <Textarea
                id="exam-preparation"
                value={form.preparation}
                onChange={(event) =>
                  setForm({ ...form, preparation: event.target.value })
                }
                rows={2}
                placeholder="Ex : à jeun 6 heures avant l'examen"
              />
            </div>
            <div className="flex items-center gap-6">
              <div className="space-y-2">
                <Label htmlFor="exam-order">Ordre d'affichage</Label>
                <Input
                  id="exam-order"
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
                  id="exam-active"
                  checked={form.is_active}
                  onCheckedChange={(checked) => setForm({ ...form, is_active: checked })}
                />
                <Label htmlFor="exam-active">Visible sur le site</Label>
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
            <AlertDialogTitle>Supprimer cet examen ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est définitive. L'examen n'apparaîtra plus sur la page CISAM.
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
