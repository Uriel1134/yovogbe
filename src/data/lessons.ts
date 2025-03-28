export type LessonCategory = {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  content: LessonContent[];
  exercises: Exercise[];
  completed: boolean;
};

export type LessonContent = {
  type: 'text' | 'audio' | 'image';
  content: string;
  translation?: {
    fon: string;
    french: string;
  };
};

export type Exercise = {
  id: string;
  type: 'quiz' | 'flashcard' | 'translation' | 'listening';
  question: string;
  options?: string[];
  correctAnswer: string;
  completed: boolean;
};

export type FlashcardType = {
  id: string;
  french: string;
  fon: string;
  audio?: string;
  image?: string;
  mastered: boolean;
};

export type UserProgress = {
  userId: string;
  completedLessons: string[];
  streakDays: number;
  lastActivity: Date;
  totalPoints: number;
  masteredWords: number;
};

// Sample lesson data
export const lessonCategories: LessonCategory[] = [
  {
    id: 'greetings',
    title: 'Salutations',
    description: 'Salutations de base et présentations',
    iconName: 'hand-wave',
    color: 'bg-app-primary',
    lessons: [
      {
        id: 'basic-greetings',
        title: 'Salutations de base',
        description: 'Apprenez à dire bonjour et au revoir',
        level: 'beginner',
        content: [
          {
            type: 'text',
            content: 'Bonjour ',
            translation: {
              fon: 'Mi Kudo zanzan',
              french: 'Bonjour'
            }
          },
          {
            type: 'text',
            content: 'Au revoir ',
            translation: {
              fon: 'Edabo',
              french: 'Au revoir'
            }
          },
          {
            type: 'audio',
            content: 'bonjour.mp3'
          }
        ],
        exercises: [
          {
            id: 'greet-quiz-1',
            type: 'quiz',
            question: 'Comment dit on "Bonjour" en Français?',
            options: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît'],
            correctAnswer: 'Bonjour',
            completed: false
          }
        ],
        completed: false
      }
    ]
  },
  {
    id: 'self-intro',
    title: 'Présentation personnelle',
    description: 'Apprenez à vous présenter',
    iconName: 'user',
    color: 'bg-app-secondary',
    lessons: [
      {
        id: 'name-age',
        title: 'Nom et âge',
        description: 'Présentez-vous en parlant de votre nom et de votre âge',
        level: 'beginner',
        content: [
          {
            type: 'text',
            content: 'Je m\'appelle... ',
            translation: {
              fon: 'Nyikɔ ɖo...',
              french: 'Je m\'appelle...'
            }
          },
          {
            type: 'text',
            content: 'J\'ai ... ans ',
            translation: {
              fon: 'Un do ɔjɔ́ ...',
              french: 'J\'ai ... ans'
            }
          }
        ],
        exercises: [
          {
            id: 'intro-quiz-1',
            type: 'quiz',
            question: 'Comment dit-on "Noukotché" en français ?',
            options: ['Je suis', 'Je m\'appelle', 'J\'ai', 'J\'habite'],
            correctAnswer: 'Je m\'appelle',
            completed: false
          }
        ],
        completed: false
      }
    ]
  },
  {
    id: 'work',
    title: 'Work Phrases',
    description: 'Useful phrases for the workplace',
    iconName: 'briefcase',
    color: 'bg-app-accent',
    lessons: [
      {
        id: 'job-titles',
        title: 'Job Titles',
        description: 'Common job titles in French',
        level: 'beginner',
        content: [
          {
            type: 'text',
            content: 'Je suis médecin (I am a doctor)',
            translation: {
              fon: 'Nye nyí dɔnɔ́ gb',
              french: 'Je suis médecin'
            }
          },
          {
            type: 'text',
            content: 'Je travaille comme... (I work as...)',
            translation: {
              fon: 'Un wà aza ...',
              french: 'Je travaille comme...'
            }
          }
        ],
        exercises: [
          {
            id: 'work-quiz-1',
            type: 'quiz',
            question: 'Comment dit-on "Je travaille comme" en français ?',
            options: ['Je suis', 'Je travaille comme', 'J\'ai un travail', 'Mon travail est'],
            correctAnswer: 'Je travaille comme',
            completed: false
          }
        ],
        completed: false
      }
    ]
  },
  {
    id: 'daily',
    title: 'Daily Routines',
    description: 'parlez nous de votre routine quotidienne',
    iconName: 'clock',
    color: 'bg-purple-500',
    lessons: [
      {
        id: 'morning-routine',
        title: 'Routine du matin',
        description: 'Apprenez à parler de vos activités matinales',
        level: 'beginner',
        content: [
          {
            type: 'text',
            content: 'Je me réveille',
            translation: {
              fon: 'Nyi jɛ',
              french: 'Je me réveille'
            }
          },
          {
            type: 'text',
            content: 'Je me lève',
            translation: {
              fon: 'Nyi jɛ',
              french: 'Je me lève'
            }
          },
          {
            type: 'text',
            content: 'Je me douche',
            translation: {
              fon: 'Nyi sɔ',
              french: 'Je me douche'
            }
          },
          {
            type: 'audio',
            content: 'morning-routine.mp3'
          }
        ],
        exercises: [
          {
            id: 'morning-quiz-1',
            type: 'quiz',
            question: 'Comment dit-on "Je me réveille" en fon ?',
            options: ['Nyi jɛ', 'Nyi sɔ', 'Nyi dɔ', 'Nyi wɛ'],
            correctAnswer: 'Nyi jɛ',
            completed: false
          }
        ],
        completed: false
      },
      {
        id: 'evening-routine',
        title: 'Routine du soir',
        description: 'Apprenez à parler de vos activités du soir',
        level: 'beginner',
        content: [
          {
            type: 'text',
            content: 'Je dîne',
            translation: {
              fon: 'Nyi dɔ',
              french: 'Je dîne'
            }
          },
          {
            type: 'text',
            content: 'Je vais dormir',
            translation: {
              fon: 'Nyi wɛ',
              french: 'Je vais dormir'
            }
          },
          {
            type: 'audio',
            content: 'evening-routine.mp3'
          }
        ],
        exercises: [
          {
            id: 'evening-quiz-1',
            type: 'quiz',
            question: 'Comment dit-on "Je vais dormir" en fon ?',
            options: ['Nyi wɛ', 'Nyi jɛ', 'Nyi sɔ', 'Nyi dɔ'],
            correctAnswer: 'Nyi wɛ',
            completed: false
          }
        ],
        completed: false
      }
    ]
  },
  {
    id: 'food',
    title: 'Food & Dining',
    description: 'Order food and discuss cuisine',
    iconName: 'utensils',
    color: 'bg-orange-500',
    lessons: [
      {
        id: 'basic-foods',
        title: 'Aliments de base',
        description: 'Apprenez les noms des aliments de base',
        level: 'beginner',
        content: [
          {
            type: 'text',
            content: 'Le riz',
            translation: {
              fon: 'Wɛ',
              french: 'Le riz'
            }
          },
          {
            type: 'text',
            content: 'Le pain',
            translation: {
              fon: 'Buru',
              french: 'Le pain'
            }
          },
          {
            type: 'audio',
            content: 'basic-foods.mp3'
          }
        ],
        exercises: [
          {
            id: 'food-quiz-1',
            type: 'quiz',
            question: 'Comment dit-on "Le riz" en fon ?',
            options: ['Wɛ', 'Buru', 'Dɔ', 'Sɔ'],
            correctAnswer: 'Wɛ',
            completed: false
          }
        ],
        completed: false
      },
      {
        id: 'ordering-food',
        title: 'Commander à manger',
        description: 'Apprenez à commander de la nourriture',
        level: 'intermediate',
        content: [
          {
            type: 'text',
            content: 'Je voudrais commander',
            translation: {
              fon: 'Nyi bɔ',
              french: 'Je voudrais commander'
            }
          },
          {
            type: 'text',
            content: 'Combien ça coûte ?',
            translation: {
              fon: 'Elɔ jɛ ?',
              french: 'Combien ça coûte ?'
            }
          },
          {
            type: 'audio',
            content: 'ordering-food.mp3'
          }
        ],
        exercises: [
          {
            id: 'order-quiz-1',
            type: 'quiz',
            question: 'Comment dit-on "Combien ça coûte ?" en fon ?',
            options: ['Elɔ jɛ ?', 'Nyi bɔ', 'Wɛ', 'Buru'],
            correctAnswer: 'Elɔ jɛ ?',
            completed: false
          }
        ],
        completed: false
      }
    ]
  },
  {
    id: 'shopping',
    title: 'Shopping',
    description: 'Vocabulaire pour les courses',
    iconName: 'shopping-bag',
    color: 'bg-pink-500',
    lessons: [
      {
        id: 'shopping-basics',
        title: 'Les bases du shopping',
        description: 'Apprenez les expressions de base pour faire les courses',
        level: 'beginner',
        content: [
          {
            type: 'text',
            content: 'Je vais faire les courses',
            translation: {
              fon: 'Nyi jɛ',
              french: 'Je vais faire les courses'
            }
          },
          {
            type: 'text',
            content: 'Où est le marché ?',
            translation: {
              fon: 'Afɔ ɖo ?',
              french: 'Où est le marché ?'
            }
          },
          {
            type: 'audio',
            content: 'shopping-basics.mp3'
          }
        ],
        exercises: [
          {
            id: 'shopping-quiz-1',
            type: 'quiz',
            question: 'Comment dit-on "Où est le marché ?" en fon ?',
            options: ['Afɔ ɖo ?', 'Nyi jɛ', 'Wɛ', 'Buru'],
            correctAnswer: 'Afɔ ɖo ?',
            completed: false
          }
        ],
        completed: false
      },
      {
        id: 'bargaining',
        title: 'Marchander',
        description: 'Apprenez à marchander les prix',
        level: 'intermediate',
        content: [
          {
            type: 'text',
            content: 'C\'est trop cher',
            translation: {
              fon: 'E jɛ',
              french: 'C\'est trop cher'
            }
          },
          {
            type: 'text',
            content: 'Pouvez-vous baisser le prix ?',
            translation: {
              fon: 'A jɛ ?',
              french: 'Pouvez-vous baisser le prix ?'
            }
          },
          {
            type: 'audio',
            content: 'bargaining.mp3'
          }
        ],
        exercises: [
          {
            id: 'bargain-quiz-1',
            type: 'quiz',
            question: 'Comment dit-on "C\'est trop cher" en fon ?',
            options: ['E jɛ', 'A jɛ ?', 'Wɛ', 'Buru'],
            correctAnswer: 'E jɛ',
            completed: false
          }
        ],
        completed: false
      }
    ]
  }
];

// Sample flashcards data
export const flashcards: FlashcardType[] = [
  {
    id: 'card1',
    french: 'Bonjour',
    fon: 'Kudo',
    audio: 'bonjour.mp3',
    mastered: false
  },
  {
    id: 'card2',
    french: 'Merci',
    fon: 'Awanou',
    audio: 'merci.mp3',
    mastered: false
  },
  {
    id: 'card3',
    french: 'Au revoir',
    fon: 'Edabo',
    audio: 'aurevoir.mp3',
    mastered: false
  },
  {
    id: 'card4',
    french: 'Comment allez-vous?',
    fon: 'Alokɛ?',
    audio: 'comment-allez-vous.mp3',
    mastered: false
  },
  {
    id: 'card5',
    french: 'Je m\'appelle',
    fon: 'Nyikɔ ɖo',
    audio: 'je-mappelle.mp3',
    mastered: false
  },
  {
    id: 'card6',
    french: 'Je me réveille',
    fon: 'Nyi jɛ',
    audio: 'morning-routine.mp3',
    mastered: false
  },
  {
    id: 'card7',
    french: 'Je me douche',
    fon: 'Nyi sɔ',
    audio: 'morning-routine.mp3',
    mastered: false
  },
  {
    id: 'card8',
    french: 'Je vais dormir',
    fon: 'Nyi wɛ',
    audio: 'evening-routine.mp3',
    mastered: false
  },
  {
    id: 'card9',
    french: 'Le riz',
    fon: 'Wɛ',
    audio: 'basic-foods.mp3',
    mastered: false
  },
  {
    id: 'card10',
    french: 'Le pain',
    fon: 'Buru',
    audio: 'basic-foods.mp3',
    mastered: false
  },
  {
    id: 'card11',
    french: 'Je vais faire les courses',
    fon: 'Nyi jɛ',
    audio: 'shopping-basics.mp3',
    mastered: false
  },
  {
    id: 'card12',
    french: 'Où est le marché ?',
    fon: 'Afɔ ɖo ?',
    audio: 'shopping-basics.mp3',
    mastered: false
  },
  {
    id: 'card13',
    french: 'C\'est trop cher',
    fon: 'E jɛ',
    audio: 'bargaining.mp3',
    mastered: false
  },
  {
    id: 'card14',
    french: 'Pouvez-vous baisser le prix ?',
    fon: 'A jɛ ?',
    audio: 'bargaining.mp3',
    mastered: false
  }
];

// Initial user progress
export const initialUserProgress: UserProgress = {
  userId: '1',
  completedLessons: [],
  streakDays: 0,
  lastActivity: new Date(),
  totalPoints: 0,
  masteredWords: 0
};
