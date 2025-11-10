"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  ShoppingCart,
  Mail,
  Lock,
  User,
  Building2,
} from "lucide-react";
import Footer from "../common/footer";
import Link from "next/link";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName ||
      !formData.businessName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log("Registration successful", formData);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl mb-4 shadow-2xl shadow-emerald-500/30 transform hover:scale-105 transition-transform">
            <ShoppingCart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Créer un compte
          </h1>
          <p className="text-slate-600 font-medium">
            Démarrez avec votre système QuickPOS
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
          <div className="space-y-5">
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-50 border-red-200 text-red-700 rounded-xl"
              >
                <AlertDescription className="font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-slate-700 text-sm font-semibold"
              >
                Nom complet
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Jean Dupont"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="pl-12 h-14 bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="businessName"
                className="text-slate-700 text-sm font-semibold"
              >
                Nom de l&apos;entreprise
              </Label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Ma Boutique"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                  className="pl-12 h-14 bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-slate-700 text-sm font-semibold"
              >
                Adresse Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-12 h-14 bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-slate-700 text-sm font-semibold"
              >
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-12 pr-12 h-14 bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-slate-700 text-sm font-semibold"
              >
                Confirmer le mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="pl-12 pr-12 h-14 bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm pt-2">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 rounded border-slate-300 bg-slate-50 text-emerald-600 focus:ring-emerald-500/20"
              />
              <label className="text-slate-700 font-medium">
                J&apos;accepte les{" "}
                <a
                  href="#"
                  className="text-emerald-600 hover:text-emerald-700 transition-colors font-semibold"
                >
                  conditions d&apos;utilisation
                </a>{" "}
                et la{" "}
                <a
                  href="#"
                  className="text-emerald-600 hover:text-emerald-700 transition-colors font-semibold"
                >
                  politique de confidentialité
                </a>
              </label>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-200"
            >
              {loading ? "Création en cours..." : "Créer mon compte"}
            </Button>

            <div className="text-center text-sm text-slate-600 font-medium">
              Vous avez déjà un compte ?{" "}
              <Link
                href="/login"
                className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
