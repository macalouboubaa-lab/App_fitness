"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Exercise } from "@/lib/exercises";
import { motion } from "framer-motion";
import { Dumbbell, Flame, CheckCircle2 } from "lucide-react";

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  corde: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200",
  ventre: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200",
  bras: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200",
  jambes:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200",
  cardio:
    "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200",
};

// ═══════════════════════════════════════════════
// MAPPING EMOJI PAR EXERCICE
// ═══════════════════════════════════════════════
const EXERCISE_EMOJI: Record<string, string> = {
  // Échauffement
  "marche-place": "🚶‍♀️",
  "cercles-bras": "🙆‍♀️",
  "montees-genoux": "🏃‍♀️",
  rotations: "🔄",
  "squat-lent": "🐢",
  // Corde
  "corde-saut": "🪢",
  // Ventre
  crunch: "🔥",
  gainage: "🧘‍♀️",
  "planche-laterale": "🛡️",
  "releves-jambes": "🦵",
  "russian-twists": "🌀",
  bicyclette: "🚴‍♀️",
  // Bras
  "pompes-genoux": "💪",
  "dips-chaise": "🪑",
  superman: "🦸‍♀️",
  // Jambes / Fessiers
  squat: "🦵",
  "squat-sumo": "🤼‍♀️",
  "squat-bulgare": "🦵",
  "fentes-avant": "➡️",
  "fentes-arriere": "⬅️",
  "fentes-marchees": "🚶‍♀️",
  "glute-bridge": "🌉",
  "glute-bridge-1jambe": "🌉",
  "hip-thrust": "🍑",
  "donkey-kicks": "🦵",
  "fire-hydrant": "🚒",
  "wall-sit": "🧱",
  "step-up": "📈",
  mollets: "🦶",
  "mountain-climbers": "⛰️",
};

// Retourne l'emoji selon l'ID de l'exercice
function getEmoji(id: string): string {
  // Enlève le préfixe (w1-a-e1 → e1)
  const key = id.split("-e")[0] + "-e";
  // Cherche par nom dans le titre
  for (const [k, v] of Object.entries(EXERCISE_EMOJI)) {
    if (id.includes(k) || id.toLowerCase().includes(k)) return v;
  }
  return "💪"; // Fallback
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  isCompleted,
  onToggle,
}) => {
  const [imageFailed, setImageFailed] = React.useState(false);
  const emoji = findEmojiFromTitle(exercise.title);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`overflow-hidden transition-all duration-300 border ${
          isCompleted
            ? "bg-muted/40 border-primary/40 opacity-75 shadow-none"
            : "bg-card hover:shadow-md border-border"
        }`}
      >
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
          {/* Conteneur visuel */}
          <div
            className={`relative w-full sm:w-28 h-28 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex-shrink-0 flex items-center justify-center ${
              isCompleted ? "grayscale contrast-75" : ""
            }`}
          >
            {exercise.imageUrl && !imageFailed ? (
              <Image
                src={exercise.imageUrl}
                alt={`Illustration : ${exercise.title}`}
                fill
                sizes="(max-width: 640px) 100vw, 112px"
                className="z-0 object-contain p-3 brightness-0 opacity-75"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <span className="text-6xl select-none">{emoji}</span>
            )}
            {isCompleted && (
              <div className="absolute inset-0 z-10 bg-primary/20 flex items-center justify-center backdrop-blur-[1px]">
                <CheckCircle2 className="w-8 h-8 text-primary drop-shadow" />
              </div>
            )}
          </div>

          {/* Informations Exercice */}
          <div className="flex-1 space-y-2 text-center sm:text-left w-full">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <Badge
                variant="outline"
                className={`text-xs font-semibold capitalize ${
                  CATEGORY_COLORS[exercise.category] || "bg-secondary"
                }`}
              >
                {exercise.category}
              </Badge>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>{exercise.reps}</span>
              </div>
            </div>

            <h4
              className={`text-base font-bold transition-all ${
                isCompleted
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {exercise.title}
            </h4>

            <div className="flex items-center justify-center sm:justify-start text-xs text-muted-foreground gap-1.5">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Objectif : {exercise.reps}</span>
            </div>
          </div>

          {/* Action Checkbox */}
          <div className="flex items-center justify-end sm:pl-2">
            <label
              htmlFor={`checkbox-${exercise.id}`}
              className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-accent transition-colors"
            >
              <Checkbox
                id={`checkbox-${exercise.id}`}
                checked={isCompleted}
                onCheckedChange={() => onToggle(exercise.id)}
                className="w-6 h-6 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="sr-only">Marquer comme fait</span>
            </label>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════
// Trouve l'emoji à partir du titre de l'exercice
// ═══════════════════════════════════════════════
function findEmojiFromTitle(title: string): string {
  const t = title.toLowerCase();

  if (t.includes("marche")) return "🚶‍♀️";
  if (t.includes("cercle") && t.includes("bras")) return "🙆‍♀️";
  if (t.includes("montée") || t.includes("montee")) return "🏃‍♀️";
  if (t.includes("rotation")) return "🔄";
  if (t.includes("squat lent") || t.includes("squats sans charge")) return "🐢";
  if (t.includes("corde")) return "🪢";
  if (t.includes("crunch")) return "🔥";
  if (t.includes("gainage") || t.includes("planche")) return "🧘‍♀️";
  if (t.includes("relevé") || t.includes("releve")) return "🦵";
  if (t.includes("russian")) return "🌀";
  if (t.includes("bicyclette")) return "🚴‍♀️";
  if (t.includes("pompes")) return "💪";
  if (t.includes("dips")) return "🪑";
  if (t.includes("superman")) return "🦸‍♀️";
  if (t.includes("squat sumo")) return "🤼‍♀️";
  if (t.includes("squat bulgare")) return "🦵";
  if (t.includes("fente") && t.includes("avant")) return "➡️";
  if (t.includes("fente") && t.includes("arrière")) return "⬅️";
  if (t.includes("fente") && t.includes("marchée")) return "🚶‍♀️";
  if (t.includes("fente")) return "🦵";
  if (t.includes("glute bridge") && t.includes("jambe")) return "🌉";
  if (t.includes("glute bridge")) return "🌉";
  if (t.includes("hip thrust")) return "🍑";
  if (t.includes("donkey")) return "🦵";
  if (t.includes("fire hydrant")) return "🚒";
  if (t.includes("wall sit")) return "🧱";
  if (t.includes("step-up")) return "📈";
  if (t.includes("mollet")) return "🦶";
  if (t.includes("squat")) return "🦵";
  if (t.includes("mountain")) return "⛰️";

  return "💪";
}