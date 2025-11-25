"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  passwordData: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  onPasswordDataChange: (data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
  showPasswords: {
    old: boolean;
    new: boolean;
    confirm: boolean;
  };
  onShowPasswordsChange: (passwords: {
    old: boolean;
    new: boolean;
    confirm: boolean;
  }) => void;
  oldPasswordError: string;
  errors: string;
  onPasswordChange: () => void;
  onCancel: () => void;
}

export const ChangePasswordModal = ({
  open,
  onOpenChange,
  passwordData,
  onPasswordDataChange,
  showPasswords,
  onShowPasswordsChange,
  oldPasswordError,
  errors,
  onPasswordChange,
  onCancel,
}: ChangePasswordModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-emerald-600 bg-clip-text text-transparent">
            Changer le mot de passe
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Entrez votre ancien mot de passe et choisissez-en un nouveau
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ancien mot de passe <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                type={showPasswords.old ? "text" : "password"}
                className="h-12 bg-slate-50 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all pr-12"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  onPasswordDataChange({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
                placeholder="Entrez votre ancien mot de passe"
              />
              {oldPasswordError && (
                <p className="text-red-500 text-sm mt-1">{oldPasswordError}</p>
              )}
              <button
                type="button"
                onClick={() =>
                  onShowPasswordsChange({
                    ...showPasswords,
                    old: !showPasswords.old,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
              >
                {showPasswords.old ? (
                  <svg
                    className="w-4 h-4 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nouveau mot de passe <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                type={showPasswords.new ? "text" : "password"}
                className="h-12 bg-slate-50 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all pr-12"
                value={passwordData.newPassword}
                onChange={(e) =>
                  onPasswordDataChange({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                placeholder="Entrez votre nouveau mot de passe"
              />
              {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
              <button
                type="button"
                onClick={() =>
                  onShowPasswordsChange({
                    ...showPasswords,
                    new: !showPasswords.new,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
              >
                {showPasswords.new ? (
                  <svg
                    className="w-4 h-4 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Confirmer le nouveau mot de passe{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                type={showPasswords.confirm ? "text" : "password"}
                className="h-12 bg-slate-50 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all pr-12"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  onPasswordDataChange({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirmez votre nouveau mot de passe"
              />
              {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
              <button
                type="button"
                onClick={() =>
                  onShowPasswordsChange({
                    ...showPasswords,
                    confirm: !showPasswords.confirm,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
              >
                {showPasswords.confirm ? (
                  <svg
                    className="w-4 h-4 cursor-pointer "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-11 px-6 cursor-pointer border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold transition-all"
          >
            Annuler
          </Button>
          <Button
            type="button"
            onClick={onPasswordChange}
            className="h-11 px-6 cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
            Changer le mot de passe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
