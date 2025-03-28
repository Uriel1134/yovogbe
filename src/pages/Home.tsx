import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';
import ProgressHeader from '@/components/ProgressHeader';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { Play, BookOpen } from 'lucide-react';
import { lessonCategories, initialUserProgress } from '@/data/lessons';

const Home = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Jouer l'audio d'accueil après un court délai
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error("Erreur de lecture audio:", error);
        });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="pb-20">
      {/* Audio d'accueil caché */}
      <audio
        ref={audioRef}
        src="/audios/Acceuil.mp3"
        preload="auto"
      />

      <header className="p-5 pb-3">
        <h1 className="text-3xl font-bold text-app-primary">YOVO GBE</h1>
        <p className="text-gray-500">Apprenez le français à partir du fon</p>
      </header>
      
      <div className="p-5">
        <ProgressHeader progress={initialUserProgress} />
        
        <div className="mt-8 space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Continuer l'apprentissage</h2>
            <Button
              variant="ghost"
              className="text-app-primary"
              onClick={() => navigate('/lessons')}
            >
              Voir tout
            </Button>
          </div>
          
          <div className="bg-gradient-to-r from-app-secondary/20 to-app-accent/20 p-4 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="font-medium">Salutations de base</h3>
              <p className="text-sm text-gray-600">Apprenez à dire BONJOUR et AU REVOIR</p>
            </div>
            <Button 
              size="sm"
              className="bg-app-primary hover:bg-app-primary/90"
              onClick={() => navigate('/category/greetings/lesson/basic-greetings')}
            >
              <Play className="h-4 w-4 mr-1" />
              Continue
            </Button>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {lessonCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Etude Rapide</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              className="h-24 bg-app-primary hover:bg-app-primary/90"
              onClick={() => navigate('/flashcards')}
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-2">🎴</span>
                <span>Cartes mémoire</span>
              </div>
            </Button>
            <Button 
              className="h-24 bg-app-secondary hover:bg-app-secondary/90"
              onClick={() => navigate('/lessons')}
            >
              <div className="flex flex-col items-center">
                <BookOpen className="h-6 w-6 mb-2" />
                <span>Toute les leçons</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Home;
