import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonCategories } from '@/data/lessons';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import Quiz from '@/components/Quiz';
import AudioPlayer from '@/components/AudioPlayer';
import AudioPlayerLoop from '@/components/AudioPlayerLoop';
import { useToast } from '@/hooks/use-toast';

const LessonView = () => {
  const { categoryId, lessonId } = useParams<{ categoryId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const category = lessonCategories.find(cat => cat.id === categoryId);
  const lesson = category?.lessons.find(lesson => lesson.id === lessonId);
  
  if (!category || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Leçon introuvable</h2>
          <Button 
            onClick={() => navigate('/home')}
            className="bg-app-primary hover:bg-app-primary/90"
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }
  
  const allContent = [...lesson.content, ...lesson.exercises];
  const currentContent = allContent[currentStep];
  const isExercise = 'type' in currentContent && currentContent.type.includes('quiz');

  useEffect(() => {
    // Nettoyer le timer précédent si présent
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }

    // Si nous sommes dans la leçon des salutations de base et que le contenu actuel est "Bonjour"
    if (categoryId === 'greetings' && 
        lessonId === 'basic-greetings' && 
        currentContent && 
        'content' in currentContent && 
        currentContent.content.includes('Bonjour')) {
      // Jouer l'audio après 1 seconde
      autoPlayTimerRef.current = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(error => {
            console.error("Erreur de lecture audio:", error);
          });
          setIsPlaying(true);
        }
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [categoryId, lessonId, currentStep]);
  
  const handleNext = () => {
    if (currentStep < allContent.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Lesson completed
      toast({
        title: "Leçon terminée !",
        description: "Excellent travail, vous avez terminé cette leçon !",
      });
      navigate('/home');
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/home');
    }
  };
  
  const handleExerciseComplete = (id: string, correct: boolean) => {
    if (correct && !completedExercises.includes(id)) {
      setCompletedExercises([...completedExercises, id]);
    }
  };
  
  const renderContent = () => {
    if (!currentContent) return null;
    
    if ('question' in currentContent) {
      return (
        <Quiz 
          exercise={currentContent} 
          onComplete={handleExerciseComplete} 
        />
      );
    } else {
      switch (currentContent.type) {
        case 'text':
          // Si c'est la leçon de salutation et le contenu contient "Bonjour"
          if (categoryId === 'greetings' && 
              lessonId === 'basic-greetings' && 
              currentContent.content.includes('Bonjour')) {
            return (
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
                {/* Image d'illustration */}
                <div className="w-full max-w-md mx-auto mb-8">
                  <img 
                    src="/assets/bonjou.png" 
                    alt="Illustration de salutation" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                
                {/* Texte Bonjour en grand */}
                <h2 className="text-4xl font-bold text-center text-[#1F41BB] mb-6">
                  {currentContent.content}
                </h2>

                {/* Audio caché */}
                <audio
                  ref={audioRef}
                  src="/audios/Bonjour.mp3"
                  preload="auto"
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
            );
          }
          // Si c'est la leçon de salutation et le contenu contient "Au revoir"
          if (categoryId === 'greetings' && 
              lessonId === 'basic-greetings' && 
              currentContent.content.includes('Au revoir')) {
            return (
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
                {/* Image d'illustration */}
                <div className="w-full max-w-md mx-auto mb-8">
                  <img 
                    src="/assets/aurevoir.png" 
                    alt="Illustration d'au revoir" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                
                {/* Texte Au revoir en grand */}
                <h2 className="text-4xl font-bold text-center text-[#1F41BB] mb-6">
                  {currentContent.content}
                </h2>

                {/* Audio caché */}
                <audio
                  ref={audioRef}
                  src="/audios/aurevoir.mp3"
                  preload="auto"
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
            );
          }
          // Pour les autres contenus textuels
          return (
            <div className="bg-white rounded-xl shadow p-6 max-w-lg mx-auto">
              <h3 className="text-xl font-medium mb-4">{currentContent.content}</h3>
              {currentContent.translation && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="mb-2">
                    <span className="text-sm font-medium text-app-primary">Français :</span>
                    <p>{currentContent.translation.french}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-app-secondary">Fon :</span>
                    <p>{currentContent.translation.fon}</p>
                  </div>
                </div>
              )}
            </div>
          );
        case 'audio':
          if (categoryId === 'greetings') {
            return (
              <div className="bg-white rounded-xl shadow p-6 max-w-lg mx-auto text-center">
                <h3 className="text-xl font-medium mb-6">Écoutez et répétez</h3>
                <AudioPlayerLoop 
                  audioFile={currentContent.content}
                  label={currentContent.translation ? `${currentContent.translation.french} - ${currentContent.translation.fon}` : undefined}
                  className="mt-4"
                  repeatCount={3}
                  repeatDelay={2000}
                />
              </div>
            );
          }
          return (
            <div className="bg-white rounded-xl shadow p-6 max-w-lg mx-auto text-center">
              <h3 className="text-xl font-medium mb-6">Écoutez la prononciation</h3>
              <AudioPlayer 
                audioFile={currentContent.content}
                label={currentContent.translation ? `${currentContent.translation.french} - ${currentContent.translation.fon}` : undefined}
                className="mt-4"
              />
            </div>
          );
        default:
          return null;
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      <div className="pb-20">
        <header className={`${category.color} text-white p-5`}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white mb-4"
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <p>{lesson.description}</p>
          
          <div className="flex mt-4 overflow-x-auto py-2 gap-1">
            {allContent.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 rounded-full flex-grow transition-colors ${
                  index === currentStep 
                    ? 'bg-white' 
                    : index < currentStep 
                    ? 'bg-white/80' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </header>
        
        <div className="p-5">
          <div className="mb-8">
            {renderContent()}
          </div>
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            
            <Button
              className="bg-app-primary hover:bg-app-primary/90"
              onClick={handleNext}
              disabled={isExercise && 'id' in currentContent && !completedExercises.includes(currentContent.id)}
            >
              {currentStep === allContent.length - 1 ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Terminer
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
