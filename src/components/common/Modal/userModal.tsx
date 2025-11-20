"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiService } from "@/src/core/services/apiService";
import {
  Client,
  ClientStatus,
  ClientType,
  Country,
} from "@/src/core/types/types";
import { User, Mail, Phone, MapPin, Percent, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface EditClientModalProps {
  client?: Client | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (updatedClient: Partial<Client>) => void;
  mode: "add" | "edit";
}

const defaultClient: Partial<Client> = {
  firstName: "",
  lastName: "",
  type: ClientType.INDIVIDUAL || ClientType.COMPANY,
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
  discountRate: 0,
  status: ClientStatus.ACTIVE || ClientStatus.INACTIVE,
};

export default function EditClientModal({
  client,
  open,
  setOpen,
  onSave,
  mode,
}: EditClientModalProps) {
  const [form, setForm] = useState<Partial<Client>>(defaultClient);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCode, setSelectedCode] = useState<string>("+216");
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      if (mode === "edit" && client) {
        setForm(client);
        if (client.phone) {
          const match = client.phone.match(/^\+\d{1,4}/);
          if (match) setSelectedCode(match[0]);
        }
      } else {
        setForm(defaultClient);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [mode, client, open]);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoadingCountries(true);
      try {
        const response = await ApiService.getPays();
        const data: Country[] = response.data;
        const sortedCountries = data
          .filter((c) => c.idd?.root && c.idd?.suffixes?.length > 0)
          .sort((a, b) => a.name.common.localeCompare(b.name.common));

        setCountries(sortedCountries);
      } catch (error) {
        console.error("Erreur lors du chargement des pays:", error);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (field: keyof Client, value: string | number) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = () => {
    const phoneWithCode = form.phone
      ? `${selectedCode} ${form.phone.replace(/^\+?\d{1,4}\s*/, "")}`
      : "";

    onSave({ ...form, phone: phoneWithCode });
    setOpen(false);
  };

  const isEdit = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-5xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50/30 border-slate-200/60 shadow-xl p-10"
      >
        <DialogHeader className="border-b border-slate-200/60 pb-3 sticky top-0 bg-gradient-to-br from-slate-50 to-blue-50/30 z-10 ">
          <DialogTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
              <User className="w-4 h-4 text-white" />
            </div>
            {isEdit ? "Modifier le client" : "Ajouter un client"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 px-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200/50">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                Informations principales
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-slate-700 font-medium text-xs">
                      Prénom
                    </Label>
                    <Input
                      value={form.firstName}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      className="bg-white border-slate-300 focus:border-blue-400 focus:ring-blue-400/20 transition-all h-9"
                      placeholder="Entrez le prénom"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-slate-700 font-medium text-xs">
                      Nom
                    </Label>
                    <Input
                      value={form.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className="bg-white border-slate-300 focus:border-blue-400 focus:ring-blue-400/20 transition-all h-9"
                      placeholder="Entrez le nom"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-medium text-xs">
                    Type de client
                  </Label>
                  <Select
                    value={form.type}
                    onValueChange={(value) => handleChange("type", value)}
                  >
                    <SelectTrigger className="bg-white border-slate-300 focus:border-blue-400 focus:ring-blue-400/20 h-9">
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Particulier">Particulier</SelectItem>
                      <SelectItem value="Entreprise">Entreprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200/50">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-500" />
                Contact
              </h3>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-medium text-xs flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-slate-500" />
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="bg-white border-slate-300 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all h-9"
                    placeholder="email@exemple.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-medium text-xs flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-slate-500" />
                    Téléphone
                  </Label>
                  <div className="flex gap-2">
                    <Select
                      value={selectedCode}
                      onValueChange={(value) => setSelectedCode(value)}
                      disabled={isLoadingCountries}
                    >
                      <SelectTrigger className="h-9 w-[180px] bg-white cursor-pointer border-slate-300 focus:border-indigo-400 focus:ring-indigo-400/20">
                        <SelectValue placeholder="+216" />
                      </SelectTrigger>
                      <SelectContent className="bg-white max-h-60 overflow-y-auto">
                        {isLoadingCountries ? (
                          <SelectItem value="loading" disabled>
                            Chargement...
                          </SelectItem>
                        ) : (
                          countries.map((country, index) => {
                            const code =
                              country.idd.root +
                              (country.idd.suffixes[0] || "");
                            return (
                              <SelectItem key={index} value={code}>
                                <span className="flex items-center gap-2 cursor-pointer">
                                  <Image
                                    src={country.flags.png}
                                    alt={country.name.common}
                                    width={16}
                                    height={16}
                                    className="object-cover rounded"
                                  />
                                  {country.name.common} ({code})
                                </span>
                              </SelectItem>
                            );
                          })
                        )}
                      </SelectContent>
                    </Select>
                    <Input
                      value={form.phone?.replace(/^\+?\d{1,4}\s*/, "") || ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="bg-white border-slate-300 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all h-9 flex-1"
                      placeholder="712345678"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200/50">
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              Adresse
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-slate-700 font-medium text-xs">
                  Adresse complète
                </Label>
                <Input
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="bg-white border-slate-300 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all h-9"
                  placeholder="Rue, avenue..."
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-medium text-xs">
                    Pays
                  </Label>
                  <Select
                    value={form.country}
                    onValueChange={(value) => handleChange("country", value)}
                    disabled={isLoadingCountries}
                  >
                    <SelectTrigger className="bg-white border-slate-300 cursor-pointer focus:border-emerald-400 focus:ring-emerald-400/20 h-9">
                      <SelectValue placeholder="Pays" />
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-60 overflow-y-auto">
                      {isLoadingCountries ? (
                        <SelectItem value="loading" disabled>
                          Chargement...
                        </SelectItem>
                      ) : (
                        countries.map((country, index) => (
                          <SelectItem key={index} value={country.name.common}>
                            <span className="flex items-center gap-2 cursor-pointer">
                              <Image
                                src={country.flags.png}
                                alt={country.name.common}
                                width={16}
                                height={16}
                                className="object-cover rounded"
                              />
                              {country.name.common}
                            </span>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-medium text-xs">
                    Ville
                  </Label>
                  <Input
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="bg-white border-slate-300 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all h-9"
                    placeholder="Ville"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-medium text-xs">
                    Code postal
                  </Label>
                  <Input
                    value={form.postalCode}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                    className="bg-white border-slate-300 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all h-9"
                    placeholder="0000"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200/50">
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Percent className="w-4 h-4 text-amber-500" />
              Paramètres commerciaux
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-slate-700 font-medium text-xs flex items-center gap-1.5">
                  <Percent className="w-3 h-3 text-slate-500" />
                  Remise (%)
                </Label>
                <Input
                  type="number"
                  value={form.discountRate}
                  onChange={(e) =>
                    handleChange("discountRate", Number(e.target.value))
                  }
                  className="bg-white border-slate-300 focus:border-amber-400 focus:ring-amber-400/20 transition-all h-9"
                  placeholder="0"
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-700 font-medium text-xs flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-slate-500" />
                  Statut
                </Label>
                <Select
                  value={form.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger className="bg-white border-slate-300 focus:border-amber-400 focus:ring-amber-400/20 h-9">
                    <SelectValue placeholder="Sélectionnez un statut" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="active">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Actif
                      </span>
                    </SelectItem>
                    <SelectItem value="inactive">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                        Inactif
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-slate-300 cursor-pointer text-slate-700 hover:bg-slate-100 hover:text-slate-800 transition-colors h-9"
          >
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r cursor-pointer from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all h-9"
          >
            {isEdit ? "Modifier" : "Ajouter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
