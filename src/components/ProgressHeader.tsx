
import React from 'react';
import { UserProgress } from '@/data/lessons';
import { Badge } from '@/components/ui/badge';

interface ProgressHeaderProps {
  progress: UserProgress;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({ progress }) => {
  return (
    <div className="bg-gradient-to-r from-app-primary to-app-accent text-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Hello, Learner!</h2>
          <p className="text-sm text-white/80">Keep up the good work!</p>
        </div>
        <div className="flex flex-col items-end">
          <Badge className="bg-white text-app-primary font-semibold">
            {progress.streakDays} day streak
          </Badge>
          <p className="text-sm mt-1">{progress.totalPoints} points</p>
        </div>
      </div>
      <div className="mt-4 bg-white/20 h-2 rounded-full">
        <div 
          className="bg-white h-2 rounded-full animate-pulse-light"
          style={{ width: `${Math.min(progress.completedLessons.length * 10, 100)}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1 text-xs">
        <span>Progress</span>
        <span>{Math.min(progress.completedLessons.length * 10, 100)}%</span>
      </div>
    </div>
  );
};

export default ProgressHeader;
