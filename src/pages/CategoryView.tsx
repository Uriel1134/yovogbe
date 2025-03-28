
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonCategories } from '@/data/lessons';
import BottomNavigation from '@/components/BottomNavigation';
import LessonCard from '@/components/LessonCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CategoryView = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const category = lessonCategories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Category not found</h2>
          <Button 
            onClick={() => navigate('/')}
            className="bg-app-primary hover:bg-app-primary/90"
          >
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pb-20">
      <header className={`${category.color} text-white p-5`}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white mb-4"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{category.title}</h1>
        <p>{category.description}</p>
      </header>
      
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-4">Lessons</h2>
        
        {category.lessons.length > 0 ? (
          <div className="grid gap-4">
            {category.lessons.map(lesson => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                categoryId={category.id} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No lessons available yet.</p>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
            >
              Go Back Home
            </Button>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default CategoryView;
