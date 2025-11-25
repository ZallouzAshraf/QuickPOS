"use client";
import { Product } from "@/src/core/types/types";
import { Edit, Package, Trash2 } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductCard = ({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) => {
  const getStatusBadge = (stock: number) => {
    let status: "in_stock" | "low_stock" | "out_of_stock";

    if (stock === 0) status = "out_of_stock";
    else if (stock < 20) status = "low_stock";
    else status = "in_stock";

    const styles = {
      in_stock:
        "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
      low_stock: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
      out_of_stock: "bg-red-500/10 text-red-600 border border-red-500/20",
    } as const;

    const labels = {
      in_stock: "En stock",
      low_stock: "Stock faible",
      out_of_stock: "Rupture",
    } as const;

    return (
      <span
        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="group relative bg-gradient-to-br from-white to-slate-50/50 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden">
      <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200/50 overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-slate-400" />
          </div>
        )}

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => onEdit(product)}
            className="p-2 bg-white/95 hover:bg-white cursor-pointer text-slate-700 rounded-lg transition-all transform hover:scale-110"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(product)}
            className="p-2 bg-white/95 hover:bg-white cursor-pointer text-red-600 rounded-lg transition-all transform hover:scale-110"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute top-2 right-2">
          {getStatusBadge(product.stock)}
        </div>
      </div>

      <div className="p-3 space-y-2">
        <div>
          <h3
            className="font-bold text-sm text-slate-800 line-clamp-1 mb-0.5 text-ellipsis"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">
            {product.brand}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="text-xs text-slate-500 font-medium">Prix</p>
            <p className="text-lg font-bold text-emerald-600">
              {product.price}
              <span className="text-xs ml-0.5">TND</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 font-medium">Stock</p>
            <p className="text-sm font-bold text-slate-700">{product.stock}</p>
          </div>
        </div>
        <div className="pt-1">
          <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};
