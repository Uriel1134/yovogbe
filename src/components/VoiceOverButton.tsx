
import React from 'react';
import { useVoiceOver } from '@/contexts/VoiceOverContext';
import { Button } from '@/components/ui/button';
import { Mic, Square } from 'lucide-react';

interface VoiceOverButtonProps {
  audioFile: string;
  text?: string;
  className?: string;
}

const VoiceOverButton: React.FC<VoiceOverButtonProps> = ({ 
  audioFile, 
  text,
  className = '' 
}) => {
  const { isPlaying, playAudio, stopAudio } = useVoiceOver();
  
  const handleClick = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio(audioFile, text);
    }
  };
  
  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full bg-app-primary text-white hover:bg-app-primary/90 ${className}`}
      onClick={handleClick}
    >
      {isPlaying ? (
        <Square className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
};

export default VoiceOverButton;
