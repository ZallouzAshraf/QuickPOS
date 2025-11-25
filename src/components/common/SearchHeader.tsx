"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface HeaderProps {
  searchPlaceholder: string;
  textButton: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClient: () => void;
}

export const SearchHeader = ({
  textButton,
  searchPlaceholder,
  searchTerm,
  onSearchChange,
  onAddClient,
}: HeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="relative flex-1 max-w-md w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-12 bg-white border-slate-300 rounded-xl"
        />
      </div>
      <Button
        onClick={onAddClient}
        className="w-full sm:w-auto h-12 cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30"
      >
        <Plus className="w-5 h-5 mr-2" />
        {textButton}
      </Button>
    </div>
  );
};
