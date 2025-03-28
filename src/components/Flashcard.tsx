
import React, { useState } from 'react';
import { FlashcardType } from '@/data/lessons';
import { Button } from '@/components/ui/button';
import { Check, X, Mic } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import { useVoiceOver } from '@/contexts/VoiceOverContext';

interface FlashcardProps {
  flashcard: FlashcardType;
  onMark: (id: string, mastered: boolean) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ flashcard, onMark }) => {
  const [flipped, setFlipped] = useState(false);
  const { playAudio } = useVoiceOver();
  
  const handleFlip = () => {
    setFlipped(!flipped);
  };
  
  const handleVoiceOver = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Play the explanation in Fongbé about the word
    playAudio(
      flashcard.audio || '/flashcard-explanation.mp3', 
      `Voici le mot ${flashcard.french} qui se dit ${flashcard.fon} en Fongbé. Touchez pour voir la traduction.`
    );
  };
  
  return (
    <div 
      className="w-full max-w-md h-64 perspective-1000 cursor-pointer mx-auto"
      onClick={handleFlip}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className={`absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center ${flipped ? 'hidden' : ''}`}>
          <h2 className="text-2xl font-bold mb-4 text-app-primary">{flashcard.french}</h2>
          <p className="text-gray-500 mb-6">Taper pour voir la traduction</p>
          
          <Button 
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-app-primary text-white hover:bg-app-primary/90"
            onClick={handleVoiceOver}
          >
            <Mic className="h-4 w-4" />
          </Button>
          
          {flashcard.audio && (
            <div className="absolute bottom-4 right-4 text-app-primary" onClick={(e) => e.stopPropagation()}>
              <AudioPlayer 
                audioFile={flashcard.audio} 
                className="w-48" 
              />
            </div>
          )}
        </div>
        
        {/* Back of card */}
        <div className={`absolute w-full h-full backface-hidden bg-app-primary text-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center ${!flipped ? 'hidden' : ''}`}>
          <h2 className="text-2xl font-bold mb-4">{flashcard.fon}</h2>
          <p className="text-white/80 mb-6">Tap to flip back</p>
          
          <div className="absolute bottom-4 flex space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="bg-white text-red-500 rounded-full h-10 w-10"
              onClick={(e) => {
                e.stopPropagation();
                onMark(flashcard.id, false);
              }}
            >
              <X className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white text-green-500 rounded-full h-10 w-10"
              onClick={(e) => {
                e.stopPropagation();
                onMark(flashcard.id, true);
              }}
            >
              <Check className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
