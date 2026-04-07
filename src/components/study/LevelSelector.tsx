"use client";

import React from 'react';
import { DifficultyLevel } from '@/types/study';
import { cn } from '@/lib/utils';

interface Props {
  current: DifficultyLevel;
  onChange: (level: DifficultyLevel) => void;
}

const levels: DifficultyLevel[] = ['Beginner', 'Intermediate', 'JEE Advanced'];

const LevelSelector = ({ current, onChange }: Props) => {
  return (
    <div className="flex p-1 bg-muted rounded-xl w-fit mx-auto mb-8">
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => onChange(level)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            current === level 
              ? "bg-background text-primary shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default LevelSelector;