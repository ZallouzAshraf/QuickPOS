"use client";
import { Input } from "@/components/ui/input";
import { UserDTO } from "@/src/core/types/types";

interface PersonalInfoSectionProps {
  currentUser: Partial<UserDTO>;
  onInputChange: (field: string, value: string) => void;
}

export const PersonalInfoSection = ({
  currentUser,
  onInputChange,
}: PersonalInfoSectionProps) => {
  return (
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
            onChange={(e) => onInputChange("firstName", e.target.value)}
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
            onChange={(e) => onInputChange("lastName", e.target.value)}
            placeholder="Votre nom"
          />
        </div>
      </div>
    </div>
  );
};
