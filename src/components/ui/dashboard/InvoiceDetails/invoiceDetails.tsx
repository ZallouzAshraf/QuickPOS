"use client";

import { ApiService } from "@/src/core/services/apiService";
import { Invoice, InvoiceStatus, UserDTO } from "@/src/core/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InvoiceDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [currentUser, setCurrentUser] = useState<UserDTO>();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await ApiService.getInvoiceById(id as string);
        setInvoice(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement de la facture", err);
      }
    };
    fetchInvoice();
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8 print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Facture</h1>
            <p className="text-slate-600 mt-1">Détails de la facture</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              Imprimer
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
              Télécharger PDF
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Votre Société
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Services Professionnels
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                    invoice?.status === InvoiceStatus.PAID
                      ? "bg-green-100 text-green-800"
                      : invoice?.status === InvoiceStatus.PENDING
                      ? "bg-orange-100 text-orange-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      invoice?.status === InvoiceStatus.PAID
                        ? "bg-green-500"
                        : invoice?.status === InvoiceStatus.PENDING
                        ? "bg-orange-500"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  {invoice?.status || "EN ATTENTE"}
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-2">
                  {invoice?.invoiceNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 grid md:grid-cols-2 gap-6 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Facturé à
              </h3>
              <p className="text-slate-900 font-medium">
                {invoice?.clientName}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Date d&apos;émission
              </h3>
              <p className="text-slate-700">
                {invoice?.issuedAt
                  ? new Date(invoice.issuedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "-"}
              </p>
            </div>
          </div>

          <div className="px-8 py-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              ARTICLES
            </h3>

            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Produit
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide w-20">
                      Qté
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide w-32">
                      Prix Unitaire
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide w-32">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {invoice?.items &&
                    invoice.items.map((item, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <p className="font-medium text-slate-900">
                            {item.name}
                          </p>
                        </td>
                        <td className="text-center py-3 px-4 text-slate-700">
                          {item.quantity}
                        </td>
                        <td className="text-right py-3 px-4 text-slate-700">
                          {item.unitPrice.toFixed(2)} TND
                        </td>
                        <td className="text-right py-3 px-4 font-semibold text-slate-900">
                          {(item.quantity * item.unitPrice).toFixed(2)} TND
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="px-8 py-6 bg-slate-50 border-t border-slate-200">
            <div className="flex justify-end">
              <div className="w-full max-w-xs">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Sous-total</span>
                    <span className="font-medium text-slate-900">
                      {invoice?.subtotal.toFixed(2)} TND
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">TVA (19%)</span>
                    <span className="font-medium text-slate-900">
                      {invoice?.taxAmount.toFixed(2)} TND
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Remise</span>
                    <span className="font-medium text-slate-900">
                      {invoice?.discountAmount.toFixed(2)} TND
                    </span>
                  </div>

                  <div className="border-t border-slate-300 pt-3 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-900">
                        Total
                      </span>
                      <span className="text-xl font-bold text-blue-600">
                        {invoice?.total.toFixed(2)}
                        TND
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 bg-slate-900 text-center">
            <p className="text-slate-400 text-sm">
              Merci pour votre confiance • © {new Date().getFullYear()} Votre
              Société. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
