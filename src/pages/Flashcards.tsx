
import React, { useState } from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import Flashcard from '@/components/Flashcard';
import { flashcards } from '@/data/lessons';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Flashcards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userFlashcards, setUserFlashcards] = useState(flashcards);
  const { toast } = useToast();
  
  const handleNext = () => {
    if (currentIndex < userFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast({
        title: "All cards reviewed!",
        description: "You've gone through all the flashcards.",
      });
      // Could reset to the beginning or show a completion screen
      setCurrentIndex(0);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const handleMarkCard = (id: string, mastered: boolean) => {
    const updatedFlashcards = userFlashcards.map(card => {
      if (card.id === id) {
        return {...card, mastered};
      }
      return card;
    });
    
    setUserFlashcards(updatedFlashcards);
    
    if (mastered) {
      toast({
        title: "Word mastered!",
        description: "Great job! This word has been marked as mastered.",
      });
    }
    
    // Automatically go to next card
    handleNext();
  };
  
  return (
    <div className="pb-20">
      <header className="bg-app-secondary text-white p-5">
        <h1 className="text-2xl font-bold">Flashcards</h1>
        <p>Review and practice vocabulary</p>
      </header>
      
      <div className="p-5">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-500">Card {currentIndex + 1} of {userFlashcards.length}</p>
          <div className="flex gap-2">
            <span className="text-app-primary font-medium">
              {userFlashcards.filter(card => card.mastered).length} mastered
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500">
              {userFlashcards.length - userFlashcards.filter(card => card.mastered).length} to go
            </span>
          </div>
        </div>
        
        <div className="my-8">
          {userFlashcards.length > 0 && (
            <Flashcard 
              flashcard={userFlashcards[currentIndex]} 
              onMark={handleMarkCard}
            />
          )}
        </div>
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button
            className="bg-app-primary hover:bg-app-primary/90"
            onClick={handleNext}
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Flashcards;
