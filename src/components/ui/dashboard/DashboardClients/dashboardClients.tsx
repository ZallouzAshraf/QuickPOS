"use client";
import { Client } from "@/src/core/types/types";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ApiService } from "@/src/core/services/apiService";
import { ConfirmationDialog } from "@/src/components/common/Modal/confirmationDialog";
import EditClientModal from "@/src/components/common/Modal/userModal";
import { SearchHeader } from "@/src/components/common/SearchHeader";

export const DashboardClientsComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

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

  const handleAddClient = () => {
    setSelectedClient(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleSaveClient = async (client: Partial<Client>) => {
    try {
      if (modalMode === "add") {
        const response = await ApiService.createClient(client);
        setClients([...clients, response.data]);
      } else {
        const response = await ApiService.updateClient(client._id!, client);
        setClients(
          clients.map((p) => (p._id === client._id ? response.data : p))
        );
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du produit", error);
    }
  };

  const handleDeleteClient = async () => {
    if (!clientToDelete) return;
    try {
      await ApiService.deleteClient(clientToDelete._id!);
      setClients(clients.filter((c) => c._id !== clientToDelete._id));
      setClientToDelete(null);
    } catch (error) {
      console.error("Erreur lors de la suppression du client", error);
    }
  };

  return (
    <div className="space-y-6">
      <SearchHeader
        searchPlaceholder="Rechercher un client..."
        textButton="Nouveau client"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClient={handleAddClient}
      />

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
                  Adresse
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Type
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
                  <td className="px-6 py-4">
                    <span className=" text-slate-600">{client.address}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-600 text-sm">
                    {client.type}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClient(client)}
                        className="p-2 text-slate-600 cursor-pointer hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setClientToDelete(client)}
                        className="p-2 text-slate-600 cursor-pointer hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ConfirmationDialog
          open={!!clientToDelete}
          onClose={() => setClientToDelete(null)}
          title="Supprimer le client ?"
          description={
            <>
              Cette action est irréversible. Voulez-vous vraiment supprimer{" "}
              <strong>
                {clientToDelete?.firstName} {clientToDelete?.lastName}
              </strong>{" "}
              ?
            </>
          }
          confirmText="Supprimer"
          confirmClassName="bg-red-600 hover:bg-red-700 text-white"
          onConfirm={handleDeleteClient}
        />
      </div>

      <EditClientModal
        client={selectedClient}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onSave={handleSaveClient}
        mode={modalMode}
      />
    </div>
  );
};
