"use client";
import { Button } from "@/components/ui/button";
import { ApiService } from "@/src/core/services/apiService";
import { UserDTO } from "@/src/core/types/types";
import { useEffect, useState } from "react";
import { PersonalInfoSection } from "./personalInfoSection";
import { CompanyInfoSection } from "./companyInfoSection";
import { PreferencesSection } from "./preferencesSection";
import { ChangePasswordModal } from "./changePasswordModal";
import { SecuritySection } from "./securitySection";

export const DashboardSettingsComponent = () => {
  const [currentUser, setCurrentUser] = useState<Partial<UserDTO>>({});
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [errors, setErrors] = useState("");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await ApiService.currentUser();
      setCurrentUser(response.data);
    };

    fetchCurrentUser();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setCurrentUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSwitchChange = (field: string, checked: boolean) => {
    setCurrentUser((prev) => ({ ...prev, [field]: checked }));
  };

  const handleSubmit = async (data: Partial<UserDTO>) => {
    if (!currentUser?._id) return;
    await ApiService.updateUser(currentUser?._id, data);
  };

  const handlePasswordChange = async () => {
    if (!currentUser?.email) return;

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrors("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      setOldPasswordError("");
      setErrors("");
      await ApiService.updatePassword(
        currentUser.email,
        passwordData.oldPassword,
        passwordData.newPassword
      );

      setIsPasswordModalOpen(false);
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        setOldPasswordError("Ancien mot de passe incorrect");
      } else {
        console.error(error);
      }
    }
  };

  const handleCancelPasswordChange = () => {
    setIsPasswordModalOpen(false);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setShowPasswords({ old: false, new: false, confirm: false });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-emerald-600 bg-clip-text text-transparent">
          Paramètres du Compte
        </h1>
        <p className="text-slate-600">
          Gérez vos informations personnelles et préférences
        </p>
      </div>

      <PersonalInfoSection
        currentUser={currentUser}
        onInputChange={handleInputChange}
      />

      <CompanyInfoSection
        currentUser={currentUser}
        onInputChange={handleInputChange}
      />

      <PreferencesSection
        currentUser={currentUser}
        onSwitchChange={handleSwitchChange}
      />

      <SecuritySection onPasswordChange={() => setIsPasswordModalOpen(true)} />

      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
        <Button
          variant="outline"
          className="h-12 px-8 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold transition-all"
        >
          Annuler
        </Button>
        <Button
          onClick={() => handleSubmit(currentUser!)}
          className="h-12 px-8 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-900 hover:to-slate-800 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
        >
          Enregistrer les modifications
        </Button>
      </div>

      <ChangePasswordModal
        open={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
        passwordData={passwordData}
        onPasswordDataChange={setPasswordData}
        showPasswords={showPasswords}
        onShowPasswordsChange={setShowPasswords}
        oldPasswordError={oldPasswordError}
        errors={errors}
        onPasswordChange={handlePasswordChange}
        onCancel={handleCancelPasswordChange}
      />
    </div>
  );
};
