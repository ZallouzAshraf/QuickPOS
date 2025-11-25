"use client";

import { Input } from "@/components/ui/input";
import { ApiService } from "@/src/core/services/apiService";
import { Invoice } from "@/src/core/types/types";
import { Eye, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export const DashboardInvoicesComponent = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await ApiService.getInvoices();
        setInvoices(response.data);
      } catch (err) {
        console.error("Failed to fetch invoices", err);
      }
    };

    fetchInvoices();
  }, []);

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
                  Méthode de Paiement
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
                  key={invoice.invoiceNumber}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-700">
                      {invoice.invoiceNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {invoice.clientName}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">
                    {invoice.issuedAt
                      ? new Date(invoice.issuedAt).toLocaleDateString("fr-FR")
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-emerald-600">
                      {invoice.total} TND
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {invoice.paymentMethod}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          window.open(
                            `/dashboard/invoices/${invoice._id}`,
                            "_blank"
                          )
                        }
                        className="p-2 cursor-pointer text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 cursor-pointer text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
