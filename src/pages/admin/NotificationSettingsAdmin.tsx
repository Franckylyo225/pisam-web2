import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, Plus, X, Save, Bell } from "lucide-react";

interface NotificationSetting {
  id: string;
  subject_type: string;
  email_addresses: string[];
  is_active: boolean;
}

const subjectTypeLabels: Record<string, { label: string; description: string; color: string }> = {
  "Plainte & Réclamation": {
    label: "Plainte & Réclamation",
    description: "Messages concernant les plaintes et réclamations des patients",
    color: "bg-red-100 text-red-800"
  },
  "Bilan de Santé": {
    label: "Bilan de Santé",
    description: "Demandes d'informations sur les bilans de santé",
    color: "bg-blue-100 text-blue-800"
  },
  "Demande de renseignement": {
    label: "Demande de renseignement",
    description: "Questions générales et demandes d'informations",
    color: "bg-green-100 text-green-800"
  },
  "Autres": {
    label: "Autres (Général)",
    description: "Autres types de messages non catégorisés",
    color: "bg-gray-100 text-gray-800"
  }
};

const NotificationSettingsAdmin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editedSettings, setEditedSettings] = useState<Record<string, { emails: string[]; isActive: boolean }>>({});
  const [newEmails, setNewEmails] = useState<Record<string, string>>({});

  const { data: settings, isLoading } = useQuery({
    queryKey: ["notification-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notification_settings")
        .select("*")
        .order("subject_type");

      if (error) throw error;
      return data as NotificationSetting[];
    }
  });

  useEffect(() => {
    if (settings) {
      const initial: Record<string, { emails: string[]; isActive: boolean }> = {};
      settings.forEach((s) => {
        initial[s.id] = { emails: s.email_addresses || [], isActive: s.is_active };
      });
      setEditedSettings(initial);
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: async ({ id, emails, isActive }: { id: string; emails: string[]; isActive: boolean }) => {
      const { error } = await supabase
        .from("notification_settings")
        .update({ email_addresses: emails, is_active: isActive })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification-settings"] });
      toast({
        title: "Paramètres sauvegardés",
        description: "Les paramètres de notification ont été mis à jour."
      });
    },
    onError: (error) => {
      console.error("Error updating settings:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres.",
        variant: "destructive"
      });
    }
  });

  const handleAddEmail = (settingId: string) => {
    const email = newEmails[settingId]?.trim();
    if (!email) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive"
      });
      return;
    }

    const current = editedSettings[settingId]?.emails || [];
    if (current.includes(email)) {
      toast({
        title: "Email déjà ajouté",
        description: "Cette adresse email est déjà dans la liste.",
        variant: "destructive"
      });
      return;
    }

    setEditedSettings((prev) => ({
      ...prev,
      [settingId]: { ...prev[settingId], emails: [...current, email] }
    }));
    setNewEmails((prev) => ({ ...prev, [settingId]: "" }));
  };

  const handleRemoveEmail = (settingId: string, emailToRemove: string) => {
    setEditedSettings((prev) => ({
      ...prev,
      [settingId]: {
        ...prev[settingId],
        emails: prev[settingId].emails.filter((e) => e !== emailToRemove)
      }
    }));
  };

  const handleToggleActive = (settingId: string) => {
    setEditedSettings((prev) => ({
      ...prev,
      [settingId]: { ...prev[settingId], isActive: !prev[settingId].isActive }
    }));
  };

  const handleSave = (settingId: string) => {
    const edited = editedSettings[settingId];
    if (edited) {
      updateMutation.mutate({ id: settingId, emails: edited.emails, isActive: edited.isActive });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Bell className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Paramètres de Notification</h1>
          <p className="text-muted-foreground">
            Configurez les adresses email qui recevront les notifications pour chaque type de message de contact.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {settings?.map((setting) => {
          const typeInfo = subjectTypeLabels[setting.subject_type] || {
            label: setting.subject_type,
            description: "",
            color: "bg-gray-100 text-gray-800"
          };
          const edited = editedSettings[setting.id] || { emails: [], isActive: true };

          return (
            <Card key={setting.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className={typeInfo.color}>{typeInfo.label}</Badge>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={edited.isActive}
                        onCheckedChange={() => handleToggleActive(setting.id)}
                      />
                      <span className="text-sm text-muted-foreground">
                        {edited.isActive ? "Activé" : "Désactivé"}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleSave(setting.id)}
                    disabled={updateMutation.isPending}
                    size="sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                </div>
                <CardDescription>{typeInfo.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* List of emails */}
                <div className="flex flex-wrap gap-2">
                  {edited.emails.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">
                      Aucune adresse email configurée
                    </p>
                  ) : (
                    edited.emails.map((email) => (
                      <Badge
                        key={email}
                        variant="secondary"
                        className="flex items-center gap-2 py-1.5 px-3"
                      >
                        <Mail className="h-3 w-3" />
                        {email}
                        <button
                          onClick={() => handleRemoveEmail(setting.id, email)}
                          className="hover:text-destructive transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))
                  )}
                </div>

                {/* Add new email */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`email-${setting.id}`} className="sr-only">
                      Ajouter une adresse email
                    </Label>
                    <Input
                      id={`email-${setting.id}`}
                      type="email"
                      placeholder="nouvelle-adresse@exemple.com"
                      value={newEmails[setting.id] || ""}
                      onChange={(e) =>
                        setNewEmails((prev) => ({ ...prev, [setting.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddEmail(setting.id);
                        }
                      }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleAddEmail(setting.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationSettingsAdmin;
