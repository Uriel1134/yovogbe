
import React from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import { initialUserProgress } from '@/data/lessons';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Trophy, 
  Star, 
  Clock, 
  BookOpen, 
  Settings,
  LogOut
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  return (
    <div className="pb-20">
      <header className="bg-app-primary text-white p-5">
        <h1 className="text-2xl font-bold">Votre Profile</h1>
        <p>Suis tes progrès dans ton apprentissage</p>
      </header>
      
      <div className="p-5">
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex items-center">
            <div className="bg-app-primary/10 text-app-primary rounded-full p-4">
              <User className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Apprenant</h2>
              <p className="text-gray-500">Débutant</p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-app-primary">{initialUserProgress.streakDays}</p>
              <p className="text-sm text-gray-500">Série de jours</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-app-secondary">{initialUserProgress.totalPoints}</p>
              <p className="text-sm text-gray-500">Point</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-app-accent">{initialUserProgress.masteredWords}</p>
              <p className="text-sm text-gray-500">Mot</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Réussite</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 flex flex-col items-center">
              <div className="bg-yellow-100 text-yellow-600 rounded-full p-3 mb-2">
                <Trophy className="h-6 w-6" />
              </div>
              <p className="font-medium">1️⃣ Leçcon</p>
              <Badge className="mt-2 bg-green-100 text-green-700">Terminé</Badge>
            </div>
            
            <div className="border rounded-lg p-4 flex flex-col items-center">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-2">
                <Star className="h-6 w-6" />
              </div>
              <p className="font-medium">5 Série de jours</p>
              <Badge className="mt-2 bg-gray-100 text-gray-500">En cours</Badge>
            </div>
            
            <div className="border rounded-lg p-4 flex flex-col items-center">
              <div className="bg-purple-100 text-purple-600 rounded-full p-3 mb-2">
                <BookOpen className="h-6 w-6" />
              </div>
              <p className="font-medium">10 mots</p>
              <Badge className="mt-2 bg-gray-100 text-gray-500">En cours</Badge>
            </div>
            
            <div className="border rounded-lg p-4 flex flex-col items-center">
              <div className="bg-green-100 text-green-600 rounded-full p-3 mb-2">
                <Clock className="h-6 w-6" />
              </div>
              <p className="font-medium">Etudier une 1h</p>
              <Badge className="mt-2 bg-gray-100 text-gray-500">En cours</Badge>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Parametre</h3>
          
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
            >
              <Settings className="h-4 w-4 mr-2" />
              App Settings
            </Button>
            
            <Separator />
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
