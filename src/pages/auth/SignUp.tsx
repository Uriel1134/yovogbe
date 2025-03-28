import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import SpeakerLogo from "@/assets/Speaker.png"; // Import du logo

const SignUp = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    navigate("/home");
  };

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
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-[635px] h-[635px] left-[155px] top-[-327px] bg-[#F8F9FF] rounded-full" />
      <div className="absolute w-[496px] h-[496px] left-[57px] top-[-142px] rounded-full border-3 border-[#F8F9FF]" />
      <div className="absolute w-[372px] h-[372px] left-[-153.60px] top-[523px] rotate-[27deg] origin-top-left border-2 border-[#F1F4FF]" />
      <div className="absolute w-[372px] h-[372px] left-[-264.70px] top-[582.30px] border-2 border-[#F1F4FF]" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
   
        {/* Header */}
        <div className="text-center mb-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-[#1F41BB] mb-2">Créer un compte</h1>
          <Button
            variant="ghost"
            size="icon"
            className="w-20 h-20 rounded-full bg-[#1F41BB] text-white hover:bg-[#1F41BB]/90 mx-auto mb-4"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <VolumeX className="h-8 w-8" />
            ) : (
              <Volume2 className="h-8 w-8" />
            )}
          </Button>
          <p className="text-gray-600 mt-4">
            Créez un compte pour pouvoir explorer toute les fonctionnalités existantes
          </p>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src="/audios/2.mp3"
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="space-y-4">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Téléphone"
              className="w-full p-4 border-2 border-[#1F41BB] rounded-xl bg-white/5 text-gray-900 focus:ring-2 focus:ring-[#1F41BB] focus:border-transparent"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-4 border-2 border-[#1F41BB] rounded-xl bg-white/5 text-gray-900 focus:ring-2 focus:ring-[#1F41BB] focus:border-transparent"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-4 border-2 border-[#1F41BB] rounded-xl bg-white/5 text-gray-900 focus:ring-2 focus:ring-[#1F41BB] focus:border-transparent"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#1F41BB] text-white py-6 text-lg rounded-xl hover:bg-[#1F41BB]/90 transition-colors"
          >
            S'inscrire
          </Button>

          <div className="text-center mt-4">
            <button
              type="button"
              className="text-[#1F41BB] hover:text-[#1F41BB]/90 font-medium"
              onClick={() => navigate("/sign-in")}
            >
              Vous avez déjà un compte?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;