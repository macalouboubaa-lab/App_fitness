"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  upsertUser,
  fetchUserProgress,
  isSupabaseConfigured,
} from "@/lib/supabase";

interface User {
  name: string;
}

interface UserContextType {
  user: User | null;
  isLoaded: boolean;
  setUser: (name: string) => void;
  clearUser: () => void;
  getStorageKey: (key: string) => string;
  getUserSlug: () => string;
  isSynced: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("rdsg_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserState(parsed);
        // Synchroniser au démarrage
        syncUser(parsed.name);
      } catch (e) {
        console.error("Erreur de lecture du user", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const syncUser = async (name: string) => {
    if (!isSupabaseConfigured()) return;
    const slug = name.toLowerCase().trim().replace(/\s+/g, "_");
    const { error } = await upsertUser(slug, name);
    if (!error) setIsSynced(true);
  };

  const setUser = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newUser = { name: trimmed };
    setUserState(newUser);
    localStorage.setItem("rdsg_user", JSON.stringify(newUser));
    syncUser(trimmed);
  };

  const clearUser = () => {
    setUserState(null);
    localStorage.removeItem("rdsg_user");
    setIsSynced(false);
  };

  const getUserSlug = (): string => {
    if (!user) return "invite";
    return user.name.toLowerCase().trim().replace(/\s+/g, "_");
  };

  const getStorageKey = (key: string): string => {
    if (!user) return key;
    return `${key}_${getUserSlug()}`;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoaded,
        setUser,
        clearUser,
        getStorageKey,
        getUserSlug,
        isSynced,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};