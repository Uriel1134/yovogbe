
import React from 'react';
import { Lesson } from '@/data/lessons';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  categoryId: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, categoryId }) => {
  const navigate = useNavigate();
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div 
      className="lesson-card cursor-pointer"
      onClick={() => navigate(`/category/${categoryId}/lesson/${lesson.id}`)}
    >
      {lesson.completed && (
        <div className="absolute top-2 right-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      )}
      <h3 className="font-medium text-lg mb-2">{lesson.title}</h3>
      <p className="text-sm text-gray-500 mb-3 text-center">{lesson.description}</p>
      <div className="flex justify-between w-full mt-2">
        <Badge className={getLevelColor(lesson.level)}>
          {lesson.level}
        </Badge>
        <Badge className="bg-app-primary/10 text-app-primary">
          {lesson.exercises.length} exercises
        </Badge>
      </div>
    </div>
  );
};

export default LessonCard;
