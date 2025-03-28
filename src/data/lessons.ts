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
    title: '👋',
    description: '',
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
    title: '👤',
    description: '',
    iconName: 'user',
    color: 'bg-app-secondary',
    lessons: [
      {
        id: 'basic-intro',
        title: 'Présentation de base',
        description: 'Apprenez à vous présenter',
        level: 'beginner',
        content: [
          {
            type: 'text',
            content: 'Je m\'appelle ',
            translation: {
              fon: 'Ny tɔn nyi',
              french: 'Je m\'appelle'
            }
          }
        ],
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: 'work-phrases',
    title: '💼',
    description: '',
    iconName: 'briefcase',
    color: 'bg-app-accent',
    lessons: [
      {
        id: 'basic-work',
        title: 'Phrases professionnelles',
        description: 'Expressions utiles au travail',
        level: 'beginner',
        content: [],
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: 'daily-routines',
    title: '🌅',
    description: '',
    iconName: 'sun',
    color: 'bg-app-primary',
    lessons: [
      {
        id: 'morning-routine',
        title: 'Routine du matin',
        description: 'Expressions pour la routine matinale',
        level: 'beginner',
        content: [],
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: 'food-dining',
    title: '🍽️',
    description: '',
    iconName: 'utensils',
    color: 'bg-app-warning',
    lessons: [
      {
        id: 'basic-food',
        title: 'Nourriture de base',
        description: 'Vocabulaire alimentaire',
        level: 'beginner',
        content: [],
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: 'shopping',
    title: '🛍️',
    description: '',
    iconName: 'shopping-bag',
    color: 'bg-app-danger',
    lessons: [
      {
        id: 'basic-shopping',
        title: 'Shopping de base',
        description: 'Expressions pour faire les courses',
        level: 'beginner',
        content: [],
        exercises: [],
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
