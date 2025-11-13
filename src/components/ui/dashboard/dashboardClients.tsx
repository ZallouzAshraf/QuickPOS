"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Client } from "@/src/core/types/types";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import EditClientModal from "../../common/Modal/userModal";
import { ApiService } from "@/src/core/services/apiService";

export const DashboardClientsComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>();
  const filteredClients = clients?.filter(
    (client) =>
      client.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone?.includes(searchTerm) ||
      client.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await ApiService.getClients();
        setClients(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des clients", error);
      }
    };

    fetchClients();
  }, []);

  const handleSaveClient = async (updatedClient: Client) => {
    try {
      const response = await ApiService.updateClient(
        updatedClient._id,
        updatedClient
      );

      const savedClient = response.data;
      setClients((prev) =>
        prev?.map((c) => (c._id === savedClient._id ? savedClient : c))
      );
      setSelectedClient(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du client", error);
    }
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
              {filteredClients?.map((client, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {client.firstName.charAt(0)}
                        {client.lastName.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-700">
                        {client.firstName} {client.lastName}
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
