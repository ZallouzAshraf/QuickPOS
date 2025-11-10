"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShoppingCart, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { isValidEmail } from "@/src/core/utils/validation";
import Footer from "../../common/footer";
import Link from "next/link";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Veuillez entrer votre adresse email");
      return;
    }

    if (isValidEmail(email)) {
      setError("Veuillez entrer une adresse email valide");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log("Password reset email sent to:", email);
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl mb-4 shadow-2xl shadow-emerald-500/30">
              <ShoppingCart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              POS System
            </h1>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mb-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">
                Email envoyé !
              </h2>
              <p className="text-slate-600 font-medium text-base">
                Un lien de réinitialisation a été envoyé à
              </p>
              <p className="text-emerald-600 font-bold text-lg">{email}</p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                <p className="text-blue-700 text-sm font-medium">
                  Veuillez vérifier votre boîte de réception et suivre les
                  instructions pour réinitialiser votre mot de passe. Le lien
                  expire dans 24 heures.
                </p>
              </div>

              <div className="pt-6 space-y-3">
                <Button
                  onClick={() => setSuccess(false)}
                  className="w-full h-14 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-all duration-200 border border-slate-300"
                >
                  Renvoyer l&apos;email
                </Button>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors text-sm font-bold h-12"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour à la connexion
                </a>
              </div>
            </div>
          </div>

          <p className="text-center text-slate-500 text-sm mt-6 font-medium">
            © 2025 POS System. Tous droits réservés.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl mb-4 shadow-2xl shadow-emerald-500/30 transform hover:scale-105 transition-transform">
            <ShoppingCart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Mot de passe oublié ?
          </h1>
          <p className="text-slate-600 font-medium">
            Réinitialisez votre mot de passe
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
          <div className="space-y-6">
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

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-700 text-sm font-medium">
                💡 Entrez l&apos;adresse email associée à votre compte. Nous
                vous enverrons un lien pour créer un nouveau mot de passe.
              </p>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl font-medium"
                />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-200"
            >
              {loading
                ? "Envoi en cours..."
                : "Envoyer le lien de réinitialisation"}
            </Button>

            <Link
              href="auth/login"
              className="flex items-center justify-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors text-sm font-bold h-12"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la connexion
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
