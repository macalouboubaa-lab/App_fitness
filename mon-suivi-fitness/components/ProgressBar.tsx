"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  showLabel = true,
  className = "",
}) => {
  const normalizedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
          <span>Progression</span>
          <motion.span
            key={normalizedValue}
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold"
          >
            {Math.round(normalizedValue)}%
          </motion.span>
        </div>
      )}
      <Progress value={normalizedValue} className="h-2.5 rounded-full" />
    </div>
  );
};