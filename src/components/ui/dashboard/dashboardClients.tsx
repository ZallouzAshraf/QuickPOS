"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Client } from "@/src/core/types/types";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import EditClientModal from "../../common/Modal/userModal";

export const DashboardClientsComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Ahmed Ben Ali",
      type: "Particulier",
      email: "ahmed@email.com",
      phone: "+216 98 123 456",
      address: "Rue Habib Bourguiba",
      city: "Tunis",
      postalCode: "1000",
      country: "Tunisie",
      discountRate: 0,
      status: "Actif",
      createdAt: "2024-03-15",
    },
    {
      id: "2",
      name: "Fatma Trabelsi",
      type: "Particulier",
      email: "fatma@email.com",
      phone: "+216 22 654 321",
      address: "Avenue de la République",
      city: "Sfax",
      postalCode: "3000",
      country: "Tunisie",
      discountRate: 0,
      status: "Actif",
      createdAt: "2024-03-14",
    },
    {
      id: "3",
      name: "Mohamed Gharbi",
      type: "Particulier",
      email: "mohamed@email.com",
      phone: "+216 55 789 012",
      address: "Rue de la Liberté",
      city: "Sousse",
      postalCode: "4000",
      country: "Tunisie",
      discountRate: 0,
      status: "Actif",
      createdAt: "2024-03-10",
    },
  ]);

  const handleSaveClient = (updatedClient: Client) => {
    setClients((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
    setSelectedClient(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 bg-white border-slate-300 rounded-xl"
          />
        </div>
        <Button className="w-full sm:w-auto h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30">
          <Plus className="w-5 h-5 mr-2" />
          Nouveau client
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Nom
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Adresse
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="font-semibold text-slate-700">
                        {client.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-slate-700">{client.email}</p>
                      <p className="text-slate-500">{client.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">
                    {client.phone}
                  </td>
                  <td className="px-6 py-4">
                    <span className=" text-slate-600">{client.address}</span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="p-2 text-slate-600 cursor-pointer hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 cursor-pointer hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

      {selectedClient && (
        <EditClientModal
          client={selectedClient}
          open={!!selectedClient}
          setOpen={() => setSelectedClient(null)}
          onSave={handleSaveClient}
        />
      )}
    </div>
  );
};
