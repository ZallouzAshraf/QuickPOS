import { ArrowDown, ArrowUp } from "lucide-react";
import { SVGProps } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string | number;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  trend: string;
}

export const DashboardStatsCardComponent = ({
  title,
  value,
  change,
  icon: Icon,
  trend,
}: StatsCardProps) => {
  const isPositive = trend === "up";
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
          <Icon className="w-6 h-6 text-emerald-600" />
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            isPositive ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <ArrowUp className="w-4 h-4" />
          ) : (
            <ArrowDown className="w-4 h-4" />
          )}
          {change}
        </div>
      </div>
      <h3 className="text-slate-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </div>
  );
};
