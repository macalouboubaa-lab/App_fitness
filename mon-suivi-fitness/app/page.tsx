"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PROGRAM_WEEKS } from "@/lib/exercises";
import { ProgressBar } from "@/components/ProgressBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";
import { AuthGate } from "@/components/AuthGate";
import { useUser } from "@/components/UserProvider";
import { fetchUserProgress } from "@/lib/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Flame, Trophy, Calendar, ChevronRight, Zap } from "lucide-react";

function DashboardContent() {
  const { user, getStorageKey, getUserSlug } = useUser();
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;
    const key = getStorageKey("rope_jump_completed");

    // 1. Charger depuis localStorage (immédiat)
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setCompletedExercises(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      setCompletedExercises([]);
    }

    // 2. Charger depuis Supabase (async) et fusionner
    const loadFromSupabase = async () => {
      const { data } = await fetchUserProgress(getUserSlug());
      if (data && data.length > 0) {
        const supabaseIds = data.map(
          (p: { exercise_id: string }) => p.exercise_id
        );
        const localIds = saved ? JSON.parse(saved) : [];
        const merged = Array.from(new Set([...localIds, ...supabaseIds]));
        setCompletedExercises(merged);
        localStorage.setItem(key, JSON.stringify(merged));
      }
    };

    loadFromSupabase();
  }, [user, getStorageKey, getUserSlug]);

  const totalAllExercises = PROGRAM_WEEKS.flatMap((w) =>
    w.sessions.flatMap((s) => s.exercises)
  ).length;

  const totalCompleted = completedExercises.length;
  const globalPercent =
    totalAllExercises > 0 ? (totalCompleted / totalAllExercises) * 100 : 0;

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="container max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-mauve glow-mauve-sm flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-base">
              JUMP<span className="text-primary">ROPE</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/landing">
              <button className="hidden sm:block text-sm font-medium hover:text-primary transition-colors px-3 py-2">
                À propos
              </button>
            </Link>
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-primary/10 via-background to-background pt-10 pb-8 border-b">
        <div className="container max-w-5xl mx-auto px-4 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
                <Zap className="w-3.5 h-3.5" /> Programme 8 Semaines
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Bonjour {user?.name} 👋
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base mt-1">
                Suis ton évolution, gagne en endurance et sculpte ton corps jour
                après jour.
              </p>
            </div>

            <Card className="w-full md:w-auto min-w-[240px] bg-card/60 backdrop-blur">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                  <Trophy className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-2xl font-black">{totalCompleted}</div>
                  <div className="text-xs text-muted-foreground">
                    Exercices terminés sur {totalAllExercises}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-card p-4 rounded-xl border shadow-sm">
            <ProgressBar value={globalPercent} />
          </div>
        </div>
      </section>

      <main className="container max-w-5xl mx-auto px-4 pt-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Ton Parcours
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROGRAM_WEEKS.map((week, index) => {
            const weekExercises = week.sessions.flatMap((s) => s.exercises);
            const totalInWeek = weekExercises.length;
            const completedInWeek = weekExercises.filter((e) =>
              completedExercises.includes(e.id)
            ).length;
            const weekPercent =
              totalInWeek > 0 ? (completedInWeek / totalInWeek) * 100 : 0;
            const isCompleted =
              totalInWeek > 0 && completedInWeek === totalInWeek;

            return (
              <motion.div
                key={week.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/week/${week.id}`}>
                  <Card
                    className={`h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 relative overflow-hidden group cursor-pointer ${
                      isCompleted ? "bg-primary/5 border-primary/30" : ""
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs font-semibold"
                        >
                          {week.badgeText}
                        </Badge>
                        <span className="text-xs font-bold text-primary flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-orange-500" />
                          {week.jumpGoal} sauts
                        </span>
                      </div>
                      <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors flex items-center justify-between">
                        <span>{week.title}</span>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-xs">
                        {week.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0 space-y-2">
                      <ProgressBar value={weekPercent} showLabel={true} />
                      <div className="flex justify-between text-xs text-muted-foreground pt-1">
                        <span>{week.sessions.length} Séances</span>
                        <span>
                          {completedInWeek} / {totalInWeek} complétés
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>

      <footer className="container max-w-5xl mx-auto px-4 pb-10 pt-6 mt-10 border-t border-border/50">
        <div className="text-center space-y-1">
          <p className="text-sm font-bold text-foreground">Boubacar Cissé</p>
          <p className="text-xs text-primary font-semibold">
            Dev Fullstack — #77 315 04 50
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGate>
      <DashboardContent />
    </AuthGate>
  );
}