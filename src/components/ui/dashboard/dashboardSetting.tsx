import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const DashboardSettingsComponent = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6">
          Informations de l&apos;entreprise
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nom de l&apos;entreprise
            </label>
            <Input
              className="h-12 bg-slate-50 border-slate-300 rounded-xl"
              defaultValue="Ma Boutique"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <Input
              className="h-12 bg-slate-50 border-slate-300 rounded-xl"
              defaultValue="contact@maboutique.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Téléphone
            </label>
            <Input
              className="h-12 bg-slate-50 border-slate-300 rounded-xl"
              defaultValue="+216 71 123 456"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Adresse
            </label>
            <Input
              className="h-12 bg-slate-50 border-slate-300 rounded-xl"
              defaultValue="Avenue Habib Bourguiba, Tunis"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Préférences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-700">
                Notifications par email
              </p>
              <p className="text-sm text-slate-500">
                Recevoir des alertes par email
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-emerald-600 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-700">
                Alertes de stock faible
              </p>
              <p className="text-sm text-slate-500">
                Notifications quand le stock est bas
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-emerald-600 rounded"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Sécurité</h3>
        <div className="space-y-4">
          <Button className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30">
            Changer le mot de passe
          </Button>
        </div>
      </div>
    </div>
  );
};
