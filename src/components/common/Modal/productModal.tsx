"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/src/core/types/types";
import {
  Package,
  Tag,
  DollarSign,
  Layers,
  FileText,
  BarChart3,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ProductModalProps {
  product?: Product | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (product: Product) => void;
  mode: "add" | "edit";
}

const defaultProduct: Product = {
  _id: "",
  name: "",
  brand: "",
  description: "",
  category: "",
  price: 0,
  stock: 0,
  createdAt: "",
  image: "",
};

export default function ProductModal({
  product,
  open,
  setOpen,
  onSave,
  mode,
}: ProductModalProps) {
  const [form, setForm] = useState(defaultProduct);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      if (mode === "edit" && product) {
        setForm(product);
      } else {
        setForm(defaultProduct);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [mode, product, open]);

  const handleChange = (field: keyof Product, value: string | number) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = () => {
    onSave(form);
    setOpen(false);
  };

  const isEdit = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-5xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50/30 border-slate-200/60 shadow-xl p-10"
      >
        <DialogHeader className="border-b border-slate-200/60 pb-3 sticky top-0 bg-gradient-to-br from-slate-50 to-blue-50/30 z-10">
          <DialogTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
              <Package className="w-4 h-4 text-white" />
            </div>
            {isEdit ? "Modifier le produit" : "Ajouter un produit"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 px-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200/50">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-500" />
                Informations principales
              </h3>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-medium text-xs">
                    Nom du produit
                  </Label>
                  <Input
                    value={form.name ?? ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="bg-white border-slate-300 focus:border-blue-400 focus:ring-blue-400/20 transition-all h-9"
                    placeholder="Entrez le nom du produit"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-medium text-xs flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-slate-500" />
                    Marque
                  </Label>
                  <Input
                    value={form.brand ?? ""}
                    onChange={(e) => handleChange("brand", e.target.value)}
                    className="bg-white border-slate-300 focus:border-blue-400 focus:ring-blue-400/20 transition-all h-9"
                    placeholder="Entrez la marque"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-medium text-xs flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-slate-500" />
                    Catégorie
                  </Label>
                  <Select
                    value={form.category ?? ""}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger className="bg-white border-slate-300 focus:border-blue-400 focus:ring-blue-400/20 h-9">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Électronique">Électronique</SelectItem>
                      <SelectItem value="Mobilier">Mobilier</SelectItem>
                      <SelectItem value="Vêtements">Vêtements</SelectItem>
                      <SelectItem value="Alimentaire">Alimentaire</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-medium text-xs flex items-center gap-1.5">
                    <FileText className="w-3 h-3 text-slate-500" />
                    Description
                  </Label>
                  <Textarea
                    value={form.description ?? ""}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    className="bg-white border-slate-300 focus:border-blue-400 focus:ring-blue-400/20 transition-all min-h-[80px] resize-none"
                    placeholder="Description du produit..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200/50">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                Prix et Stock
              </h3>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-medium text-xs flex items-center gap-1.5">
                    <DollarSign className="w-3 h-3 text-slate-500" />
                    Prix (TND)
                  </Label>
                  <Input
                    type="number"
                    value={form.price ?? ""}
                    onChange={(e) =>
                      handleChange("price", Number(e.target.value))
                    }
                    className="bg-white border-slate-300 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all h-9"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-medium text-xs flex items-center gap-1.5">
                    <BarChart3 className="w-3 h-3 text-slate-500" />
                    Stock disponible
                  </Label>
                  <Input
                    type="number"
                    value={form.stock ?? ""}
                    onChange={(e) =>
                      handleChange("stock", Number(e.target.value))
                    }
                    className="bg-white border-slate-300 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all h-9"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-medium text-xs flex items-center gap-1.5">
                    <ImageIcon className="w-3 h-3 text-slate-500" />
                    URL de l&apos;image
                  </Label>
                  <Input
                    value={form.image ?? ""}
                    onChange={(e) => handleChange("image", e.target.value)}
                    className="bg-white border-slate-300 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all h-9"
                    placeholder="https://exemple.com/image.jpg"
                  />
                </div>

                {form.image && (
                  <div className="mt-3 p-2 bg-white rounded-lg border border-slate-200">
                    <p className="text-xs text-slate-600 mb-2">
                      Aperçu de l&apos;image :
                    </p>
                    <div className="relative w-full h-32 bg-slate-100 rounded-md overflow-hidden">
                      <Image
                        src={form.image}
                        alt="Aperçu"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "";
                          e.currentTarget.alt = "Image non disponible";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-slate-300 cursor-pointer text-slate-700 hover:bg-slate-100 hover:text-slate-800 transition-colors h-9"
          >
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r cursor-pointer  from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all h-9"
          >
            {isEdit ? "Modifier" : "Ajouter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
