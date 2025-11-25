"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserDTO } from "@/src/core/types/types";
import Image from "next/image";

interface CompanyInfoSectionProps {
  currentUser: Partial<UserDTO>;
  onInputChange: (field: string, value: string) => void;
}

export const CompanyInfoSection = ({
  currentUser,
  onInputChange,
}: CompanyInfoSectionProps) => {
  return (
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
            onChange={(e) => onInputChange("company", e.target.value)}
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
              onChange={(e) => onInputChange("email", e.target.value)}
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
              onChange={(e) => onInputChange("phone", e.target.value)}
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
            onChange={(e) => onInputChange("address", e.target.value)}
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
              onChange={(e) => onInputChange("city", e.target.value)}
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
              onChange={(e) => onInputChange("postalCode", e.target.value)}
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
              onChange={(e) => onInputChange("country", e.target.value)}
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
                onInputChange("matriculeFiscale", e.target.value)
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
  );
};
