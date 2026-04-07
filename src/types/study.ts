export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'JEE Advanced';

export interface TopicExplanation {
  level: DifficultyLevel;
  content: string;
  keyPoints: string[];
  analogy?: string;
  formulas?: string[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: DifficultyLevel;
}

export interface UserProgress {
  topicsLearned: string[];
  quizScores: { topic: string; score: number; total: number; date: string }[];
  weakAreas: string[];
  savedFormulas: Formula[];
}

export interface Formula {
  id: string;
  title: string;
  equation: string;
  subject: 'Physics' | 'Chemistry' | 'Math';
  description: string;
}