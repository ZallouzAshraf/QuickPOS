"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ApiService } from "@/src/core/services/apiService";
import { UserDTO } from "@/src/core/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export const DashboardSettingsComponent = () => {
  const [currentUser, setCurrentUser] = useState<Partial<UserDTO>>();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await ApiService.currentUser();
      setCurrentUser(response.data);
    };

    fetchCurrentUser();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setCurrentUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSwitchChange = (field: string, checked: boolean) => {
    setCurrentUser((prev) => ({ ...prev, [field]: checked }));
  };

  const handleSubmit = async (data: Partial<UserDTO>) => {
    if (!currentUser?._id) return;
    await ApiService.updateUser(currentUser?._id, data);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-emerald-600 bg-clip-text text-transparent">
          Paramètres du Compte
        </h1>
        <p className="text-slate-600">
          Gérez vos informations personnelles et préférences
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
          <h3 className="text-xl font-bold text-slate-800">
            Informations Personnelles
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Prénom <span className="text-red-500">*</span>
            </label>
            <Input
              className="h-12 bg-slate-50 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              value={currentUser?.firstName || ""}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Votre prénom"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nom <span className="text-red-500">*</span>
            </label>
            <Input
              className="h-12 bg-slate-50 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              value={currentUser?.lastName || ""}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Votre nom"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full"></div>
          <h3 className="text-xl font-bold text-slate-800">
            Informations de l&apos;entreprise
          </h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nom de l&apos;entreprise <span className="text-red-500">*</span>
            </label>
            <Input
              className="h-12 bg-slate-50 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              value={currentUser?.company || ""}
              onChange={(e) => handleInputChange("company", e.target.value)}
              placeholder="Nom de votre entreprise"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                disabled
                className="h-12 bg-slate-50 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                value={currentUser?.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="email@entreprise.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <Input
                className="h-12 bg-slate-50 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                value={currentUser?.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+216 XX XXX XXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Adresse <span className="text-red-500">*</span>
            </label>
            <Input
              className="h-12 bg-slate-50 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              value={currentUser?.address || ""}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Adresse complète"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Ville
              </label>
              <Input
                className="h-12 bg-slate-50 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                value={currentUser?.city || ""}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="Ville"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Code Postal
              </label>
              <Input
                className="h-12 bg-slate-50 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                value={currentUser?.postalCode || ""}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
                placeholder="Code postal"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Pays
              </label>
              <Input
                className="h-12 bg-slate-50 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                value={currentUser?.country || ""}
                onChange={(e) => handleInputChange("country", e.target.value)}
                placeholder="Pays"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Matricule Fiscale
              </label>
              <Input
                className="h-12 bg-slate-50 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                value={currentUser?.matriculeFiscale || ""}
                onChange={(e) =>
                  handleInputChange("matriculeFiscale", e.target.value)
                }
                placeholder="Numéro de matricule fiscale"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Logo de l&apos;entreprise
              </label>

              <Button asChild>
                <label className="cursor-pointer">
                  Choisir un fichier
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden text-emerald-600"
                  />
                </label>
              </Button>

              {currentUser?.logoUrl && (
                <Image
                  src={""}
                  alt="Logo"
                  width={80}
                  height={80}
                  className="h-20 w-auto mt-2 rounded"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
          <h3 className="text-xl font-bold text-slate-800">Préférences</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="flex-1">
              <p className="font-semibold text-slate-800">
                Notifications par email
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Recevoir des alertes et notifications par email
              </p>
            </div>
            <Switch
              checked={currentUser?.emailNotifications}
              onCheckedChange={(checked) =>
                handleSwitchChange("emailNotifications", checked)
              }
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="flex-1">
              <p className="font-semibold text-slate-800">
                Alertes de stock faible
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Notifications automatiques quand le stock est bas
              </p>
            </div>
            <Switch
              checked={currentUser?.lowStockAlerts}
              onCheckedChange={(checked) =>
                handleSwitchChange("lowStockAlerts", checked)
              }
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
          <h3 className="text-xl font-bold text-slate-800">Sécurité</h3>
        </div>

        <div className="space-y-4">
          <Button className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            Changer le mot de passe
          </Button>

          <div className="text-center">
            <button className="text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors">
              Besoin d&apos;aide ? Contactez le support
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
        <Button
          variant="outline"
          className="h-12 px-8 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold transition-all"
        >
          Annuler
        </Button>
        <Button
          onClick={() => handleSubmit(currentUser!)}
          className="h-12 px-8 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-900 hover:to-slate-800 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
        >
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
};
