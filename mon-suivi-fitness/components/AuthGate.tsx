"use client";

import { useUser } from "./UserProvider";
import { WelcomeScreen } from "./WelcomeScreen";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();

  // Éviter le flash pendant le chargement
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Si pas d'utilisateur, afficher l'écran de bienvenue
  if (!user) {
    return <WelcomeScreen />;
  }

  return <>{children}</>;
}