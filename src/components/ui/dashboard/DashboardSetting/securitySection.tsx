"use client";
import { Button } from "@/components/ui/button";

interface SecuritySectionProps {
  onPasswordChange: () => void;
}

export const SecuritySection = ({ onPasswordChange }: SecuritySectionProps) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
        <h3 className="text-xl font-bold text-slate-800">Sécurité</h3>
      </div>

      <div className="space-y-4">
        <Button
          onClick={onPasswordChange}
          className="w-full h-12 bg-gradient-to-r cursor-pointer from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300"
        >
          <svg
            className="w-4 h-4 cursor-pointer mr-2"
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
  );
};
