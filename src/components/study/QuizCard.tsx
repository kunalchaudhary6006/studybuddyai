"use client";

import React, { useState } from 'react';
import { Question } from '@/types/study';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  questions: Question[];
  onComplete: (score: number) => void;
}

const QuizCard = ({ questions, onComplete }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onComplete(score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0));
    }
  };

  return (
    <Card className="p-8 max-w-2xl mx-auto shadow-xl border-2">
      <div className="flex justify-between items-center mb-8">
        <span className="text-sm font-medium text-muted-foreground">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl font-bold mb-8 leading-tight">
        {currentQuestion.text}
      </h3>

      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleOptionSelect(i)}
            className={cn(
              "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between",
              selectedOption === i ? "border-primary bg-primary/5" : "border-muted hover:border-primary/30",
              isAnswered && i === currentQuestion.correctAnswer && "border-green-500 bg-green-50 dark:bg-green-950/20",
              isAnswered && selectedOption === i && i !== currentQuestion.correctAnswer && "border-red-500 bg-red-50 dark:bg-red-950/20"
            )}
          >
            <span className="font-medium">{option}</span>
            {isAnswered && i === currentQuestion.correctAnswer && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            {isAnswered && selectedOption === i && i !== currentQuestion.correctAnswer && <XCircle className="w-5 h-5 text-red-500" />}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="p-4 bg-muted rounded-xl mb-8 animate-in fade-in slide-in-from-top-2">
          <p className="text-sm font-medium mb-1">Explanation:</p>
          <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="flex justify-end">
        {!isAnswered ? (
          <Button onClick={handleCheck} disabled={selectedOption === null} size="lg">
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNext} size="lg" className="gap-2">
            {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default QuizCard;