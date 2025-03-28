import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
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
        <div className="text-center mb-12">
          <h1 className="text-[30px] font-bold text-[#1F41BB] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
            Connectez-vous
          </h1>
          
          {/* Audio Button */}
          <Button
            variant="ghost"
            size="icon"
            className="w-[80px] h-[80px] rounded-full bg-[#1F41BB] text-white hover:bg-[#1F41BB]/90 mx-auto mb-4"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <VolumeX className="h-8 w-8" />
            ) : (
              <Volume2 className="h-8 w-8" />
            )}
          </Button>
          
          <p className="text-black text-[14px] max-w-[236px] mx-auto" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
            Renseigner vos informations de connexion
          </p>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src="/audios/3.mp3"
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-[318px] space-y-6">
          <div className="space-y-5">
            {/* Phone Input */}
            <div className="w-full p-5 bg-[#F1F4FF] rounded-[10px] outline outline-2 outline-[#1F41BB] outline-offset-[-2px]">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Téléphone"
                className="w-full bg-transparent text-[#626262] text-[16px] focus:outline-none"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                required
              />
            </div>
            
            {/* Password Input */}
            <div className="w-full p-5 bg-[#F1F4FF] rounded-[10px]">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-transparent text-[#626262] text-[16px] focus:outline-none"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                required
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-[#1F41BB] text-[14px] hover:text-[#1F41BB]/90"
              style={{ fontFamily: 'Poppins', fontWeight: 600 }}
              onClick={() => navigate("/forgot-password")}
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#1F41BB] text-white py-[15px] text-[20px] rounded-[10px] hover:bg-[#1F41BB]/90 shadow-[0px_10px_20px_#CBD6FF] mt-4"
            style={{ fontFamily: 'Poppins', fontWeight: 600 }}
          >
            Se connecter
          </Button>

          {/* Sign up link */}
          <div className="text-center mt-6">
            <button
              type="button"
              className="text-[#494949] text-[14px] hover:text-[#1F41BB]/90"
              style={{ fontFamily: 'Poppins', fontWeight: 600 }}
              onClick={() => navigate("/sign-up")}
            >
              Créer un nouveau compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;