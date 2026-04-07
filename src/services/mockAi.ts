import { TopicExplanation, Question, DifficultyLevel, PYQ } from '../types/study';

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
      formulas: ["F_ext + F_pseudo = ma", "∫ F dt = Δp", "v_rel = u_rel + a_rel * t"],
      derivations: [
        "Derivation of Rocket Propulsion: F_ext = dp/dt = d(mv)/dt. Since mass is variable, F_ext = m(dv/dt) + v(dm/dt).",
        "Constraint Relation: For a string of length L, Σ l_i = L. Differentiating twice gives Σ a_i = 0."
      ],
      shortcuts: [
        "Pulley Shortcut: a = (Net Pulling Force) / (Total Mass)",
        "Pseudo Force: Always apply opposite to the direction of acceleration of the frame."
      ]
    }
  }
};

const PYQ_DATA: Record<string, PYQ[]> = {
  "Newton's Laws": [
    {
      id: 'pyq1',
      year: 2021,
      exam: 'JEE Advanced',
      question: "A block of mass m is placed on a smooth wedge of inclination θ. The whole system is accelerated horizontally so that the block does not slip on the wedge. The acceleration is:",
      options: ["g sin θ", "g cos θ", "g tan θ", "g / tan θ"],
      correctAnswer: 2,
      stepByStepSolution: [
        "Identify the forces in the accelerating frame of the wedge.",
        "Apply a pseudo-force 'ma' in the direction opposite to the acceleration.",
        "Resolve forces along the incline: mg sin θ (downwards) and ma cos θ (upwards).",
        "For no slipping, ma cos θ = mg sin θ.",
        "Therefore, a = g (sin θ / cos θ) = g tan θ."
      ]
    }
  ]
};

export const getExplanation = async (topic: string, level: DifficultyLevel): Promise<TopicExplanation> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const normalizedTopic = Object.keys(TOPIC_DATA).find(t => t.toLowerCase().includes(topic.toLowerCase())) || "Newton's Laws";
  return TOPIC_DATA[normalizedTopic as keyof typeof TOPIC_DATA][level];
};

export const getPYQs = async (topic: string): Promise<PYQ[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const normalizedTopic = Object.keys(PYQ_DATA).find(t => t.toLowerCase().includes(topic.toLowerCase())) || "Newton's Laws";
  return PYQ_DATA[normalizedTopic as keyof typeof PYQ_DATA];
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
    }
  ];
};