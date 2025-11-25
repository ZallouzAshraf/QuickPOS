"use client";
import { Switch } from "@/components/ui/switch";
import { UserDTO } from "@/src/core/types/types";

interface PreferencesSectionProps {
  currentUser: Partial<UserDTO>;
  onSwitchChange: (field: string, checked: boolean) => void;
}

export const PreferencesSection = ({
  currentUser,
  onSwitchChange,
}: PreferencesSectionProps) => {
  return (
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
              onSwitchChange("emailNotifications", checked)
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
              onSwitchChange("lowStockAlerts", checked)
            }
            className="data-[state=checked]:bg-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};
