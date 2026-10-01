"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "./UserProvider";
import { Zap, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function WelcomeScreen() {
  const { setUser } = useUser();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length >= 2) {
      setUser(name);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <Card className="border-primary/30 glow-mauve bg-card/80 backdrop-blur">
          <CardContent className="p-8 space-y-6">
            {/* Logo */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-mauve glow-mauve flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight">
                  JUMP<span className="text-primary">ROPE</span>
                </h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  Programme 8 semaines
                </p>
              </div>
            </div>

            {/* Badge motivation */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Bienvenue !
              </div>
            </div>

            {/* Texte d'accueil */}
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">Comment tu t'appelles ?</h2>
              <p className="text-sm text-muted-foreground">
                Entre ton prénom pour commencer. Tes progrès seront sauvegardés
                automatiquement sur cet appareil.
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ton prénom..."
                  autoFocus
                  maxLength={20}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-center text-lg font-semibold transition-all"
                />
              </div>

              <Button
                type="submit"
                disabled={name.trim().length < 2}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-mauve font-bold py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Commencer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            {/* Note */}
            <p className="text-xs text-center text-muted-foreground">
              💡 Pas de mot de passe. Tu peux changer d'utilisateur à tout moment.
            </p>
          </CardContent>
        </Card>

        {/* Signature */}
        <div className="text-center mt-6 space-y-1">
          <p className="text-xs font-bold text-foreground">Boubacar Cissé</p>
          <p className="text-xs text-primary font-semibold">
            Dev Fullstack — #77 315 04 50
          </p>
        </div>
      </motion.div>
    </div>
  );
}