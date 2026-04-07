"use client";

import React, { useState } from 'react';
import { PYQ } from '@/types/study';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  pyq: PYQ;
}

const PYQCard = ({ pyq }: Props) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const handleCheck = () => {
    if (selectedOption !== null) setIsAnswered(true);
  };

  return (
    <Card className="p-6 border-2 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
          {pyq.exam} {pyq.year}
        </Badge>
      </div>

      <p className="text-lg font-medium mb-6 leading-relaxed">
        {pyq.question}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {pyq.options.map((option, i) => (
          <button
            key={i}
            onClick={() => !isAnswered && setSelectedOption(i)}
            className={cn(
              "p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between",
              selectedOption === i ? "border-primary bg-primary/5" : "border-muted hover:border-primary/30",
              isAnswered && i === pyq.correctAnswer && "border-green-500 bg-green-50 dark:bg-green-950/20",
              isAnswered && selectedOption === i && i !== pyq.correctAnswer && "border-red-500 bg-red-50 dark:bg-red-950/20"
            )}
          >
            <span className="font-medium">{option}</span>
            {isAnswered && i === pyq.correctAnswer && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            {isAnswered && selectedOption === i && i !== pyq.correctAnswer && <XCircle className="w-5 h-5 text-red-500" />}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        {!isAnswered ? (
          <Button onClick={handleCheck} disabled={selectedOption === null} className="w-full">
            Check Answer
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => setShowSolution(!showSolution)} 
            className="w-full gap-2"
          >
            <Brain className="w-4 h-4" />
            {showSolution ? 'Hide AI Solution' : 'Show AI Solution'}
            {showSolution ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {showSolution && (
        <div className="mt-6 p-6 bg-muted/50 rounded-2xl border border-dashed border-primary/30 animate-in slide-in-from-top-2">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            Step-by-Step AI Solution
          </h4>
          <div className="space-y-4">
            {pyq.stepByStepSolution.map((step, i) => (
              <div key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default PYQCard;