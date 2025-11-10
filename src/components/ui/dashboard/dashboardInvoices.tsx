import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Invoice } from "@/src/core/types/types";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";

export const DashboardInvoicesComponent = () => {
  const invoices: Invoice[] = [
    {
      id: "INV-001",
      clientName: "Ahmed Ben Ali",
      date: "2024-03-15",
      amount: 1850,
      status: "paid",
    },
    {
      id: "INV-002",
      clientName: "Fatma Trabelsi",
      date: "2024-03-14",
      amount: 2420,
      status: "pending",
    },
    {
      id: "INV-003",
      clientName: "Mohamed Gharbi",
      date: "2024-03-10",
      amount: 980,
      status: "overdue",
    },
  ];

  const getStatusBadge = (status: Invoice["status"]) => {
    const styles = {
      paid: "bg-emerald-100 text-emerald-700",
      pending: "bg-amber-100 text-amber-700",
      overdue: "bg-red-100 text-red-700",
    };
    const labels = {
      paid: "Payée",
      pending: "En attente",
      overdue: "En retard",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Rechercher une facture..."
            className="pl-12 h-12 bg-white border-slate-300 rounded-xl"
          />
        </div>
        <Button className="w-full sm:w-auto h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30">
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle facture
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  N° Facture
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Montant
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Statut
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-700">
                      {invoice.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {invoice.clientName}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-emerald-600">
                      {invoice.amount} TND
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
