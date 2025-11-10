import { ProductDetails } from "@/src/core/types/types";
import { Receipt } from "lucide-react";

export const ProductCard = ({
  product,
  onAdd,
  viewMode,
}: {
  product: ProductDetails;
  onAdd: (product: ProductDetails) => void;
  viewMode: "grid" | "list";
}) => {
  const isLowStock = product.stock < 10;

  if (viewMode === "list") {
    return (
      <button
        onClick={() => onAdd(product)}
        className="w-full flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Receipt className="w-8 h-8 text-emerald-600" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-bold text-slate-800">{product.name}</h3>
          <p className="text-sm text-slate-500">{product.category}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-emerald-600">
            {product.price.toFixed(2)} TND
          </p>
          <p
            className={`text-xs ${
              isLowStock ? "text-red-600" : "text-slate-500"
            }`}
          >
            Stock: {product.stock}
          </p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => onAdd(product)}
      className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all overflow-hidden group"
    >
      <div className="h-40 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center relative">
        <Receipt className="w-16 h-16 text-emerald-600 group-hover:scale-110 transition-transform" />
        {isLowStock && (
          <span className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            Stock bas
          </span>
        )}
      </div>
      <div className="p-4">
        <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full mb-2">
          {product.category}
        </span>
        <h3 className="font-bold text-slate-800 mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-emerald-600">
            {product.price.toFixed(2)} TND
          </span>
          <span className="text-sm text-slate-500">Stock: {product.stock}</span>
        </div>
      </div>
    </button>
  );
};
