"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Dumbbell,
  Heart,
  Zap,
  Trophy,
  ArrowRight,
  Check,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-mauve glow-mauve-sm flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight">
              JUMP<span className="text-primary">ROPE</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#programmes" className="hover:text-primary transition-colors">
              Programmes
            </a>
            <a href="#apropos" className="hover:text-primary transition-colors">
              À propos
            </a>
            <a href="#tarifs" className="hover:text-primary transition-colors">
              Tarifs
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-mauve-sm"
              >
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
              🔥 Programme 8 semaines
            </Badge>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
              PLUS FORT
              <br />
              <span className="text-stroke">CHAQUE JOUR</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Transforme ton corps et ton mental avec un programme de corde à
              sauter conçu pour tous les niveaux. Résultats visibles en 8
              semaines.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 glow-mauve text-primary-foreground font-bold"
                >
                  Commencer maintenant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="#programmes">
                <Button size="lg" variant="outline" className="border-primary/30">
                  Voir les programmes
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-16"
          >
            {[
              { value: "1200+", label: "Utilisatrices" },
              { value: "8", label: "Semaines" },
              { value: "100%", label: "Gratuit" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-primary text-glow">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programmes */}
      <section id="programmes" className="py-20 px-4 border-t border-border">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black mb-3">
              Nos <span className="text-primary">Programmes</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Des séances conçues pour tous les niveaux, du débutant à
              l&apos;expert.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Dumbbell,
                title: "Corde à sauter",
                desc: "Cardio intense et coordination.",
              },
              {
                icon: Heart,
                title: "Renforcement",
                desc: "Ventre, bras, jambes, fessiers.",
              },
              {
                icon: Zap,
                title: "HIIT",
                desc: "Brûle-graisses haute intensité.",
              },
              {
                icon: Trophy,
                title: "Suivi",
                desc: "Progression visible en temps réel.",
              },
            ].map((prog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:glow-mauve-sm">
                      <prog.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">{prog.title}</h3>
                    <p className="text-sm text-muted-foreground">{prog.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* À propos */}
      <section id="apropos" className="py-20 px-4 border-t border-border">
        <div className="container max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              ÉLÈVE TON
              <br />
              <span className="text-primary text-glow">NIVEAU</span>
              <br />
              DE FITNESS
            </h2>
            <p className="text-muted-foreground mb-6">
              Un programme complet et progressif conçu pour transformer ta
              silhouette et booster ton énergie. Chaque séance est pensée pour
              être réalisable à la maison, sans matériel compliqué.
            </p>
            <ul className="space-y-3">
              {[
                "Séances de 20 à 40 minutes",
                "Accessible à tous les niveaux",
                "Suivi de progression intégré",
                "Aucun abonnement caché",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-mauve glow-mauve-lg p-1">
              <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center">
                <Zap className="w-32 h-32 text-primary animate-glow-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-20 px-4 border-t border-border">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black mb-3">
              Choisis ton <span className="text-primary">rythme</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Le programme de base est gratuit. Les options premium arrivent
              bientôt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Découverte",
                price: "0",
                period: "gratuit",
                features: [
                  "Programme 8 semaines",
                  "Suivi de progression",
                  "GIFs d'exercices",
                ],
                highlight: false,
              },
              {
                name: "Personnalisé",
                price: "9",
                period: "/mois",
                features: [
                  "Tout Découverte",
                  "Programme sur mesure",
                  "Coaching par message",
                  "Conseils nutrition",
                ],
                highlight: true,
              },
              {
                name: "Premium",
                price: "19",
                period: "/mois",
                features: [
                  "Tout Personnalisé",
                  "Appels vidéo 1:1",
                  "Plan alimentaire complet",
                  "Accès communauté privée",
                ],
                highlight: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full relative overflow-hidden ${
                    plan.highlight
                      ? "border-primary/60 glow-mauve bg-primary/5"
                      : "border-border"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                      Populaire
                    </div>
                  )}
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-primary">
                        {plan.price}€
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {plan.period}
                      </span>
                    </div>
                    <ul className="space-y-2 pt-2">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/" className="block pt-2">
                      <Button
                        className={`w-full ${
                          plan.highlight
                            ? "bg-primary hover:bg-primary/90 glow-mauve-sm"
                            : ""
                        }`}
                        variant={plan.highlight ? "default" : "outline"}
                      >
                        Commencer
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Signature */}
      <footer className="border-t border-border py-12 px-4 bg-card/50">
        <div className="container max-w-5xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-mauve glow-mauve-sm flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg">
              JUMP<span className="text-primary">ROPE</span>
            </span>
          </div>

          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Transforme ton corps, gagne en énergie, deviens la meilleure
            version de toi-même.
          </p>

          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <a
              href="mailto:macalouboubaa@gmail.com"
              className="hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="tel:+221773150450"
              className="hover:text-primary transition-colors"
              aria-label="Téléphone"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* SIGNATURE */}
          <div className="pt-6 border-t border-border/50">
            <p className="text-sm font-bold text-foreground">
              Boubacar Cissé
            </p>
            <p className="text-xs text-primary font-semibold mt-1">
              Dev Fullstack — #77 315 04 50
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              © {new Date().getFullYear()} Jump Rope Master. Tous droits
              réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}