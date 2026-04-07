import { TopicExplanation, Question, DifficultyLevel } from '../types/study';

const TOPIC_DATA: Record<string, Record<DifficultyLevel, TopicExplanation>> = {
  "Newton's Laws": {
    'Beginner': {
      level: 'Beginner',
      content: "Newton's laws describe how objects move. Think of it as the 'rules of the playground'. If you don't push a swing, it stays still. If you push it harder, it goes faster!",
      keyPoints: ["Inertia: Objects hate changing what they're doing", "F=ma: Force equals mass times acceleration", "Action-Reaction: Every push has an equal opposite push"],
      analogy: "Imagine trying to slide a heavy box vs a light ball. The box 'resists' more because it has more mass (Inertia)."
    },
    'Intermediate': {
      level: 'Intermediate',
      content: "We quantify motion using vectors. The second law states that the rate of change of momentum is proportional to the applied force.",
      keyPoints: ["Vector addition of forces", "Free body diagrams (FBD)", "Frictional forces and coefficients"],
      formulas: ["F = dp/dt", "f = μN"]
    },
    'JEE Advanced': {
      level: 'JEE Advanced',
      content: "Focus on non-inertial frames, pseudo-forces, and variable mass systems. Understanding the constraints in complex pulley-block systems is crucial.",
      keyPoints: ["Pseudo-force in accelerating frames", "Constraint equations for complex systems", "Impulse-momentum theorem in 2D/3D"],
      formulas: ["F_ext + F_pseudo = ma", "∫ F dt = Δp"]
    }
  }
};

export const getExplanation = async (topic: string, level: DifficultyLevel): Promise<TopicExplanation> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const normalizedTopic = Object.keys(TOPIC_DATA).find(t => t.toLowerCase().includes(topic.toLowerCase())) || "Newton's Laws";
  return TOPIC_DATA[normalizedTopic as keyof typeof TOPIC_DATA][level];
};

export const generateQuiz = async (topic: string, difficulty: DifficultyLevel): Promise<Question[]> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  return [
    {
      id: '1',
      text: `Which law explains why a passenger jerks forward when a bus stops suddenly?`,
      options: ["Newton's 1st Law", "Newton's 2nd Law", "Newton's 3rd Law", "Law of Gravitation"],
      correctAnswer: 0,
      explanation: "Inertia of motion keeps the body moving forward even when the bus stops.",
      difficulty
    },
    {
      id: '2',
      text: `If force is doubled and mass is halved, acceleration becomes:`,
      options: ["Same", "Double", "Four times", "Half"],
      correctAnswer: 2,
      explanation: "a = F/m. If F -> 2F and m -> m/2, then a -> 2F/(m/2) = 4(F/m).",
      difficulty
    }
  ];
};