"use client";

import { createContext, useContext, useEffect, useState } from "react";

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
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("rdsg_user");
    if (saved) {
      try {
        setUserState(JSON.parse(saved));
      } catch (e) {
        console.error("Erreur de lecture du user", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const setUser = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newUser = { name: trimmed };
    setUserState(newUser);
    localStorage.setItem("rdsg_user", JSON.stringify(newUser));
  };

  const clearUser = () => {
    setUserState(null);
    localStorage.removeItem("rdsg_user");
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
      value={{ user, isLoaded, setUser, clearUser, getStorageKey, getUserSlug }}
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