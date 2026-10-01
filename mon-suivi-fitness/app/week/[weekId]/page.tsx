"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PROGRAM_WEEKS, Week } from "@/lib/exercises";
import { ExerciseCard } from "@/components/ExerciseCard";
import { ProgressBar } from "@/components/ProgressBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";
import { AuthGate } from "@/components/AuthGate";
import { useUser } from "@/components/UserProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Trophy,
  Flame,
  CheckCircle,
  Zap,
} from "lucide-react";

function WeekContent() {
  const params = useParams();
  const router = useRouter();
  const weekId = Number(params.weekId);
  const { user, getStorageKey } = useUser();

  const week: Week | undefined = PROGRAM_WEEKS.find((w) => w.id === weekId);

  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;
    const key = getStorageKey("rope_jump_completed");
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
  }, [user, getStorageKey]);

  const toggleExercise = (exerciseId: string) => {
    const key = getStorageKey("rope_jump_completed");
    const updated = completedExercises.includes(exerciseId)
      ? completedExercises.filter((id) => id !== exerciseId)
      : [...completedExercises, exerciseId];

    setCompletedExercises(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  if (!week) {
    return (
      <div className="container max-w-4xl py-12 text-center space-y-4">
        <h2 className="text-2xl font-bold">Semaine introuvable</h2>
        <Button onClick={() => router.push("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour au tableau de bord
        </Button>
      </div>
    );
  }

  const allExercises = week.sessions.flatMap((s) => s.exercises);
  const totalExercises = allExercises.length;
  const completedCount = allExercises.filter((e) =>
    completedExercises.includes(e.id)
  ).length;
  const weekProgressPercent =
    totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Accueil</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-semibold hidden sm:flex">
              Semaine {week.id} sur 8
            </Badge>
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 pt-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 bg-gradient-to-br from-primary/10 via-primary/5 to-background p-6 rounded-2xl border"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {week.title}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {week.description}
              </p>
            </div>
            <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1">
              {week.badgeText}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 text-sm font-medium">
            <div className="flex items-center gap-2 text-primary">
              <Flame className="w-5 h-5" />
              <span>Objectif : {week.jumpGoal} sauts</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle className="w-5 h-5" />
              <span>
                {completedCount} / {totalExercises} exercices faits
              </span>
            </div>
          </div>

          <ProgressBar value={weekProgressPercent} className="pt-2" />
        </motion.div>

        {week.sessions.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="font-semibold text-lg">Contenu bientôt disponible !</p>
            <p className="text-sm">
              Reste concentrée sur tes objectifs des semaines précédentes.
            </p>
          </Card>
        ) : (
          <div className="space-y-8">
            {week.sessions.map((session, sIdx) => {
              const sessionCompletedCount = session.exercises.filter((e) =>
                completedExercises.includes(e.id)
              ).length;
              const isSessionDone =
                session.exercises.length > 0 &&
                sessionCompletedCount === session.exercises.length;

              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sIdx * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-bold">{session.title}</h2>
                    </div>
                    {isSessionDone && (
                      <Badge className="bg-primary/15 text-primary border-primary/30">
                        Terminée 🎉
                      </Badge>
                    )}
                  </div>

                  <div className="grid gap-4">
                    {session.exercises.map((exercise) => (
                      <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        isCompleted={completedExercises.includes(exercise.id)}
                        onToggle={toggleExercise}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      <footer className="container max-w-4xl mx-auto px-4 pb-10 pt-6 mt-10 border-t border-border/50">
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

export default function WeekDetailPage() {
  return (
    <AuthGate>
      <WeekContent />
    </AuthGate>
  );
}