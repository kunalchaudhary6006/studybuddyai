"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DifficultyLevel, TopicExplanation, Question } from '@/types/study';
import { getExplanation, generateQuiz } from '@/services/mockAi';
import LevelSelector from '@/components/study/LevelSelector';
import ExplanationCard from '@/components/study/ExplanationCard';
import QuizCard from '@/components/study/QuizCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BrainCircuit, GraduationCap, Sparkles, Loader2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Learn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topic = searchParams.get('topic') || "Newton's Laws";
  
  const [level, setLevel] = useState<DifficultyLevel>('Beginner');
  const [explanation, setExplanation] = useState<TopicExplanation | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn');
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      const data = await getExplanation(topic, level);
      setExplanation(data);
      setLoading(false);
    };
    loadContent();
  }, [topic, level]);

  const startQuiz = async () => {
    setLoading(true);
    const quizData = await generateQuiz(topic, level);
    setQuestions(quizData);
    setMode('quiz');
    setLoading(false);
  };

  const handleQuizComplete = (score: number) => {
    showSuccess(`Quiz Complete! You scored ${score}/${questions.length}`);
    setMode('learn');
  };

  const handleSpeak = () => {
    if (!explanation) return;
    const utterance = new SpeechSynthesisUtterance(explanation.content);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-primary" />
            <h1 className="font-bold text-lg truncate max-w-[200px]">{topic}</h1>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-8">
        {mode === 'learn' ? (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-4">
                <Sparkles className="w-4 h-4" />
                AI Teaching Mode
              </div>
              <h2 className="text-3xl font-black mb-6">Mastering {topic}</h2>
              <LevelSelector current={level} onChange={setLevel} />
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-muted-foreground font-medium">AI is synthesizing your lesson...</p>
              </div>
            ) : explanation && (
              <div className="space-y-8">
                <ExplanationCard explanation={explanation} onSpeak={handleSpeak} />
                
                <div className="flex justify-center pt-8">
                  <Button size="lg" onClick={startQuiz} className="h-16 px-10 rounded-2xl text-lg font-bold gap-3 shadow-xl hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                    Test Your Knowledge
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="pt-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black mb-2">Knowledge Check</h2>
              <p className="text-muted-foreground">Topic: {topic} ({level})</p>
            </div>
            <QuizCard questions={questions} onComplete={handleQuizComplete} />
            <div className="mt-8 text-center">
              <Button variant="ghost" onClick={() => setMode('learn')}>
                Cancel Quiz
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Learn;