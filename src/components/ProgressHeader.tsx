import React from 'react';
import { UserProgress } from '@/data/lessons';
import { Badge } from '@/components/ui/badge';
import { Trophy, Flame, Star, Book } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProgressHeaderProps {
  progress: UserProgress;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({ progress }) => {
  // Calculer le pourcentage de progression
  const progressPercentage = Math.min(progress.completedLessons.length * 10, 100);
  
  // Calculer le niveau basé sur les points
  const level = Math.floor(progress.totalPoints / 100) + 1;
  
  // Calculer les points restants pour le prochain niveau
  const pointsToNextLevel = 100 - (progress.totalPoints % 100);

  return (
    <div className="bg-gradient-to-r from-app-primary to-app-accent text-white p-6 rounded-xl shadow-lg">
      {/* En-tête avec niveau et streak */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            Niveau {level}
          </h2>
          <p className="text-sm text-white/90 mt-1">
            {pointsToNextLevel} points jusqu'au niveau suivant
          </p>
        </div>
        <div className="flex flex-col items-end">
          <Badge className="bg-white/20 text-white font-semibold flex items-center gap-1">
            <Flame className="h-4 w-4 text-orange-400" />
            {progress.streakDays} jours
          </Badge>
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="font-semibold">{progress.totalPoints} points</span>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span className="text-sm font-medium">Leçons complétées</span>
          </div>
          <p className="text-2xl font-bold mt-1">{progress.completedLessons.length}</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span className="text-sm font-medium">Mots maîtrisés</span>
          </div>
          <p className="text-2xl font-bold mt-1">{progress.masteredWords}</p>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Progression totale</span>
          <span className="font-medium">{progressPercentage}%</span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-3 bg-white/20"
        />
        <p className="text-xs text-white/80 text-center mt-2">
          {progress.completedLessons.length} leçons terminées
        </p>
      </div>

      {/* Message d'encouragement */}
      {progressPercentage < 100 ? (
        <p className="text-sm text-white/90 mt-4 text-center font-medium">
          Continue ton excellent travail ! 🎯
        </p>
      ) : (
        <p className="text-sm text-white/90 mt-4 text-center font-medium">
          Félicitations ! Tu as terminé toutes les leçons ! 🎉
        </p>
      )}
    </div>
  );
};

export default ProgressHeader;
