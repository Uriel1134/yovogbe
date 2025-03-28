
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BookOpen, Star, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      name: 'Home',
      icon: HomeIcon,
      path: '/'
    },
    {
      name: 'Lessons',
      icon: BookOpen,
      path: '/lessons'
    },
    {
      name: 'Flashcards',
      icon: Star,
      path: '/flashcards'
    },
    {
      name: 'Profile',
      icon: User,
      path: '/profile'
    }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              "transition-colors duration-200",
              location.pathname === item.path
                ? "text-app-primary"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
