"use client";

import React from 'react';
import { TopicExplanation } from '@/types/study';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, BookOpen, Zap, Volume2, FileText, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  explanation: TopicExplanation;
  onSpeak: () => void;
}

const ExplanationCard = ({ explanation, onSpeak }: Props) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="p-8 border-2 border-primary/10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <Button variant="ghost" size="icon" onClick={onSpeak} className="rounded-full">
            <Volume2 className="w-5 h-5 text-primary" />
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Concept Deep Dive</h2>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground mb-8">
          {explanation.content}
        </p>

        {explanation.analogy && (
          <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/50 mb-8">
            <div className="flex items-center gap-2 mb-3 text-amber-700 dark:text-amber-400">
              <Lightbulb className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">Analogy</span>
            </div>
            <p className="italic text-amber-900 dark:text-amber-200">"{explanation.analogy}"</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-primary">
                <Zap className="w-4 h-4" />
                Key Takeaways
              </h3>
              <ul className="space-y-2">
                {explanation.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {explanation.shortcuts && explanation.shortcuts.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Rocket className="w-4 h-4" />
                  Shortcuts & Tricks
                </h3>
                <div className="space-y-2">
                  {explanation.shortcuts.map((trick, i) => (
                    <div key={i} className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/50 text-sm">
                      {trick}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {explanation.formulas && explanation.formulas.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-bold">Essential Formulas</h3>
                <div className="flex flex-wrap gap-2">
                  {explanation.formulas.map((formula, i) => (
                    <Badge key={i} variant="secondary" className="font-mono text-sm py-1 px-3">
                      {formula}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {explanation.derivations && explanation.derivations.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <FileText className="w-4 h-4" />
                  Derivations
                </h3>
                <div className="space-y-3">
                  {explanation.derivations.map((derivation, i) => (
                    <div key={i} className="p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50 text-sm font-mono leading-relaxed">
                      {derivation}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExplanationCard;