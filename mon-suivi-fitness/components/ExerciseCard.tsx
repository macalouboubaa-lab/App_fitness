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
  jambes: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200",
  cardio: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200",
};

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  isCompleted,
  onToggle,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`overflow-hidden transition-all duration-300 border ${
          isCompleted
            ? "bg-muted/40 border-emerald-500/40 opacity-75 shadow-none"
            : "bg-card hover:shadow-md border-border"
        }`}
      >
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-28 h-28 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={exercise.gifUrl}
              alt={exercise.title}
              fill
              unoptimized
              className={`object-cover transition-transform duration-300 ${
                isCompleted ? "grayscale contrast-75" : "hover:scale-105"
              }`}
            />
            {isCompleted && (
              <div className="absolute inset-0 bg-emerald-950/20 flex items-center justify-center backdrop-blur-[1px]">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 drop-shadow" />
              </div>
            )}
          </div>

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

          <div className="flex items-center justify-end sm:pl-2">
            <label
              htmlFor={`checkbox-${exercise.id}`}
              className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-accent transition-colors"
            >
              <Checkbox
                id={`checkbox-${exercise.id}`}
                checked={isCompleted}
                onCheckedChange={() => onToggle(exercise.id)}
                className="w-6 h-6 rounded-md data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
              />
              <span className="sr-only">Marquer comme fait</span>
            </label>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};