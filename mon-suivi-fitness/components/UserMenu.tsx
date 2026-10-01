"use client";

import { useState } from "react";
import { useUser } from "./UserProvider";
import { Button } from "@/components/ui/button";
import { User, LogOut, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function UserMenu() {
  const { user, clearUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    if (confirm("Changer d'utilisateur ? Tes progrès resteront sauvegardés.")) {
      clearUser();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full gap-2 hover:bg-primary/10"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-mauve flex items-center justify-center text-white text-xs font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay pour fermer */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden"
            >
              <div className="p-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-mauve flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Session active
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full p-3 flex items-center gap-2 text-sm text-left hover:bg-destructive/10 text-destructive transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Changer d'utilisateur
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}