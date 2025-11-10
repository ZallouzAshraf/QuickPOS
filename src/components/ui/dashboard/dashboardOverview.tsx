import {
  DollarSign,
  FileText,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { DashboardStatsCardComponent } from "./dashboardStatsCard";
import { useAppContext } from "@/src/core/context/AppContext";

export const DashboardOverviewComponent = () => {
  const { setIsSalesMode, setActiveTab } = useAppContext();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardStatsCardComponent
          title="Revenus totaux"
          value="45,280 TND"
          change="+12.5%"
          icon={DollarSign}
          trend="up"
        />
        <DashboardStatsCardComponent
          title="Ventes aujourd'hui"
          value="23"
          change="+5.2%"
          icon={ShoppingCart}
          trend="up"
        />
        <DashboardStatsCardComponent
          title="Clients actifs"
          value="156"
          change="+8.1%"
          icon={Users}
          trend="up"
        />
        <DashboardStatsCardComponent
          title="Produits en stock"
          value="342"
          change="-2.4%"
          icon={Package}
          trend="down"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">Actions rapides</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => {
              setActiveTab("sales");
              setIsSalesMode(true);
            }}
            className="flex items-center gap-4 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl hover:shadow-lg transition-all group border-2 border-emerald-200"
          >
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl group-hover:scale-110 transition-transform">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-800">Nouvelle vente</p>
              <p className="text-sm text-slate-600">Ouvrir le point de vente</p>
            </div>
          </button>
          <button className="flex items-center gap-4 p-6 bg-slate-50 rounded-xl hover:shadow-lg transition-all group border-2 border-slate-200">
            <div className="p-3 bg-slate-200 rounded-xl group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-slate-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-800">Nouvelle facture</p>
              <p className="text-sm text-slate-600">Créer une facture</p>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Activité récente
        </h3>
        <div className="space-y-3">
          {[
            {
              action: "Nouvelle facture créée",
              client: "Ahmed Ben Ali",
              amount: "850 TND",
              time: "Il y a 5 min",
            },
            {
              action: "Paiement reçu",
              client: "Fatma Trabelsi",
              amount: "1,200 TND",
              time: "Il y a 15 min",
            },
            {
              action: "Nouveau client ajouté",
              client: "Mohamed Gharbi",
              amount: null,
              time: "Il y a 1 heure",
            },
          ].map((activity, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="flex-1">
                <p className="font-semibold text-slate-700">
                  {activity.action}
                </p>
                <p className="text-sm text-slate-500">{activity.client}</p>
              </div>
              <div className="text-right">
                {activity.amount && (
                  <p className="font-bold text-emerald-600">
                    {activity.amount}
                  </p>
                )}
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
