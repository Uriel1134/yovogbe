import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerLoopProps {
  audioFile: string;
  label?: string;
  autoPlay?: boolean;
  className?: string;
  repeatCount?: number;
  repeatDelay?: number;
}

const AudioPlayerLoop: React.FC<AudioPlayerLoopProps> = ({ 
  audioFile, 
  label, 
  autoPlay = false,
  className = '',
  repeatCount = 3,
  repeatDelay = 2000
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [currentRepeat, setCurrentRepeat] = useState(0);
  const [isRepeating, setIsRepeating] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startRepeatSequence = () => {
    if (!isRepeating) return;
    
    setCurrentRepeat(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    
    if (isRepeating && currentRepeat < repeatCount - 1) {
      setCurrentRepeat(prev => prev + 1);
      timeoutRef.current = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(console.error);
        }
      }, repeatDelay);
    }
  };
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      } else {
        startRepeatSequence();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progressValue = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressValue);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  return (
    <div className={`audio-player p-4 bg-white rounded-lg shadow-sm ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xs text-gray-400">
            Répétition {currentRepeat + 1} sur {repeatCount}
          </p>
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-[#1F41BB]"
          onClick={togglePlay}
          title={isPlaying ? "Pause" : "Lecture"}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        
        <div className="flex-1">
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={(value) => {
              if (audioRef.current) {
                const seekTime = (value[0] / 100) * audioRef.current.duration;
                audioRef.current.currentTime = seekTime;
                setProgress(value[0]);
              }
            }}
            className="cursor-pointer"
          />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className={`text-gray-500 ${isRepeating ? 'text-[#1F41BB]' : ''}`}
          onClick={toggleRepeat}
          title={isRepeating ? "Désactiver la répétition" : "Activer la répétition"}
        >
          <Repeat className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500"
          onClick={toggleMute}
          title={isMuted ? "Activer le son" : "Couper le son"}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        
        <div className="w-16">
          <Slider
            value={[volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="cursor-pointer"
            title="Volume"
          />
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src={audioFile}
        autoPlay={autoPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
};

export default AudioPlayerLoop; 