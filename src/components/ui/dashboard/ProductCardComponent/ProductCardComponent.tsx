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
        className="w-full flex items-center justify-between cursor-pointer gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg flex items-center justify-center">
            <Receipt className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="min-w-0 text-left">
            <h3 className="font-semibold text-slate-800 truncate">
              {product.name}
            </h3>
            <p className="text-xs text-slate-500 truncate">
              {product.category}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-base font-semibold text-emerald-600">
            {product.price.toFixed(2)} TND
          </p>
          <p
            className={`text-xs ${
              isLowStock ? "text-red-600 font-medium" : "text-slate-400"
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
      className="bg-white rounded-xl border cursor-pointer border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all overflow-hidden group"
    >
      <div className="h-28 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center relative">
        <Receipt className="w-10 h-10 text-emerald-600 group-hover:scale-110 transition-transform" />
        {isLowStock && (
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-semibold rounded-full">
            Stock bas
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-slate-800 text-sm truncate">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 mb-2 truncate">
          {product.category}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-emerald-600">
            {product.price.toFixed(2)} TND
          </span>
          <span
            className={`text-xs ${
              isLowStock ? "text-red-600 font-medium" : "text-slate-400"
            }`}
          >
            {product.stock} en stock
          </span>
        </div>
      </div>
    </button>
  );
};
