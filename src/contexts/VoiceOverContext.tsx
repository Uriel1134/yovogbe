
import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

type VoiceOverContextType = {
  isPlaying: boolean;
  playAudio: (audioFile: string, text?: string) => void;
  stopAudio: () => void;
};

const VoiceOverContext = createContext<VoiceOverContextType | undefined>(undefined);

export const useVoiceOver = () => {
  const context = useContext(VoiceOverContext);
  if (context === undefined) {
    throw new Error('useVoiceOver must be used within a VoiceOverProvider');
  }
  return context;
};

interface VoiceOverProviderProps {
  children: ReactNode;
}

export const VoiceOverProvider: React.FC<VoiceOverProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (audioFile: string, text?: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(audioFile);
    audioRef.current.onplay = () => setIsPlaying(true);
    audioRef.current.onended = () => setIsPlaying(false);
    audioRef.current.onerror = () => {
      console.error("Error playing audio file:", audioFile);
      setIsPlaying(false);
      
      // For development, if the audio file doesn't exist, use text-to-speech as fallback
      if (text && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR'; // Using French as a fallback
        speechSynthesis.speak(utterance);
      }
    };
    
    audioRef.current.play().catch(error => {
      console.error("Audio playback failed:", error);
      setIsPlaying(false);
    });
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
    
    // Also stop any speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  return (
    <VoiceOverContext.Provider value={{ isPlaying, playAudio, stopAudio }}>
      {children}
    </VoiceOverContext.Provider>
  );
};
