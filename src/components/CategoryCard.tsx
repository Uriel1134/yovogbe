
import React from 'react';
import { LessonCategory } from '@/data/lessons';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Clock } from 'lucide-react';

interface CategoryCardProps {
  category: LessonCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();
  
  const getIcon = () => {
    switch (category.iconName) {
      case 'hand-wave':
        return <span className="text-2xl">👋</span>;
      case 'user':
        return <User className="h-8 w-8" />;
      case 'briefcase':
        return <span className="text-2xl">💼</span>;
      case 'clock':
        return <Clock className="h-8 w-8" />;
      case 'utensils':
        return <span className="text-2xl">🍴</span>;
      case 'shopping-bag':
        return <span className="text-2xl">🛍️</span>;
      default:
        return <BookOpen className="h-8 w-8" />;
    }
  };
  
  return (
    <div 
      className={`category-card ${category.color} bg-opacity-10 cursor-pointer`}
      onClick={() => navigate(`/category/${category.id}`)}
    >
      <div className={`${category.color} text-white p-3 rounded-full mb-2`}>
        {getIcon()}
      </div>
      <h3 className="font-medium text-lg">{category.title}</h3>
      <p className="text-sm text-gray-500 text-center">{category.description}</p>
      {category.lessons.length > 0 ? (
        <span className="badge bg-app-secondary bg-opacity-20 text-app-secondary mt-2">
          {category.lessons.length} lessons
        </span>
      ) : (
        <span className="badge bg-gray-200 text-gray-500 mt-2">
          Coming soon
        </span>
      )}
    </div>
  );
};

export default CategoryCard;
