import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerProps {
  audioFile: string;
  label?: string;
  autoPlay?: boolean;
  className?: string;
  onEnded?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  audioFile, 
  label, 
  autoPlay = false,
  className = '',
  onEnded
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      const playAudio = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Auto-play failed:", error);
        }
      };
      playAudio();
    }
  }, [autoPlay]);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
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
  
  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    onEnded?.();
  };
  
  return (
    <div className={`audio-player p-3 bg-white rounded-lg shadow-sm ${className}`}>
      {label && <p className="text-sm text-gray-500 mb-2">{label}</p>}
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-app-primary"
          onClick={togglePlay}
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
          className="text-app-primary"
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX className="h-6 w-6" />
          ) : (
            <Volume2 className="h-6 w-6" />
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
          />
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src={audioFile}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;
