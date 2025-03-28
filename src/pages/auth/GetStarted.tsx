import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const GetStarted = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-between py-8">
        {/* Illustration */}
        <div className="w-full max-w-md">
          <img 
            src="src/assets/illustration.png" 
            alt="Person thinking with headphones" 
            className="w-full h-auto"
          />
        </div>

        {/* Sound Icon */}
        <div className="my-8 text-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-20 h-20 rounded-full bg-[#1F41BB] text-white hover:bg-[#1F41BB]/90 mb-2"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <VolumeX className="h-8 w-8" />
            ) : (
              <Volume2 className="h-8 w-8" />
            )}
          </Button>
          <p className="text-gray-600 mt-2">Écoutez l'introduction</p>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src="/audios/1.mp3"
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Action Button */}
        <div className="w-full">
          <Button
            className="w-full bg-[#1F41BB] text-white py-6 text-lg rounded-xl hover:bg-[#1F41BB]/90"
            onClick={() => navigate("/sign-up")}
          >
            Commencer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted; 