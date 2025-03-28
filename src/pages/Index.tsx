
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import { VoiceOverProvider } from '@/contexts/VoiceOverContext';
import VoiceOverButton from '@/components/VoiceOverButton';

const Index = () => {
  return (
    <VoiceOverProvider>
      <div className="relative">
        <div className="fixed top-4 right-4 z-10">
          <VoiceOverButton 
            audioFile="/welcome.mp3" 
            text="Bienvenue sur FoniTalk, l'application pour apprendre le français à partir du Fon. Touchez l'écran pour commencer à apprendre."
          />
        </div>
        <Home />
      </div>
    </VoiceOverProvider>
  );
};

export default Index;
