import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryView from "./pages/CategoryView";
import LessonView from "./pages/LessonView";
import Flashcards from "./pages/Flashcards";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/auth/Welcome";
import GetStarted from "./pages/auth/GetStarted";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { VoiceOverProvider } from "@/contexts/VoiceOverContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <VoiceOverProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryView />} />
            <Route path="/category/:categoryId/lesson/:lessonId" element={<LessonView />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/lessons" element={<CategoryView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </VoiceOverProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
