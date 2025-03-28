import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a delay before showing the GetStarted page
    const timer = setTimeout(() => {
      navigate("/get-started");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1F41BB]">
      <div className="w-32 h-32">
        <img src="src/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default Welcome; 