import { Product } from "@/src/core/types/types";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItem {
  product: Product;
  quantity: number;
}

export const CartItemComponent = ({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
      <div className="flex-1">
        <h4 className="font-semibold text-slate-800">{item.product.name}</h4>
        <p className="text-sm text-slate-500">
          {item.product.price.toFixed(2)} TND
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center bg-white border border-slate-300 rounded-lg hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center font-bold text-slate-800">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center bg-white border border-slate-300 rounded-lg hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="w-24 text-right">
        <p className="font-bold text-slate-800">
          {(item.product.price * item.quantity).toFixed(2)} TND
        </p>
      </div>
      <button
        onClick={() => onRemove(item.product._id)}
        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
