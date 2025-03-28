
import React, { useState } from 'react';
import { Exercise } from '@/data/lessons';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizProps {
  exercise: Exercise;
  onComplete: (id: string, correct: boolean) => void;
}

const Quiz: React.FC<QuizProps> = ({ exercise, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const correct = selectedAnswer === exercise.correctAnswer;
    setIsCorrect(correct);
    setHasSubmitted(true);
    onComplete(exercise.id, correct);
  };
  
  const getOptionClass = (option: string) => {
    if (!hasSubmitted || selectedAnswer !== option) {
      return selectedAnswer === option 
        ? 'border-app-primary bg-app-primary/10' 
        : 'border-gray-200 hover:bg-gray-50';
    }
    
    if (option === exercise.correctAnswer) {
      return 'border-green-500 bg-green-50 text-green-700';
    }
    
    return selectedAnswer === option
      ? 'border-red-500 bg-red-50 text-red-700'
      : 'border-gray-200 opacity-50';
  };
  
  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-lg mx-auto">
      <h3 className="text-xl font-medium mb-6">{exercise.question}</h3>
      
      <div className="space-y-3 mb-6">
        {exercise.options?.map((option, index) => (
          <button
            key={index}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${getOptionClass(option)}`}
            onClick={() => !hasSubmitted && setSelectedAnswer(option)}
            disabled={hasSubmitted}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {hasSubmitted && option === exercise.correctAnswer && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              {hasSubmitted && option === selectedAnswer && option !== exercise.correctAnswer && (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          </button>
        ))}
      </div>
      
      {!hasSubmitted ? (
        <Button 
          className="w-full bg-app-primary hover:bg-app-primary/90"
          onClick={handleSubmit}
          disabled={!selectedAnswer}
        >
          Submit Answer
        </Button>
      ) : (
        <div className="text-center">
          {isCorrect ? (
            <div className="text-green-600 flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Correct! Great job!</span>
            </div>
          ) : (
            <div className="text-red-600 flex items-center justify-center gap-2">
              <XCircle className="h-5 w-5" />
              <span>Incorrect. The correct answer is {exercise.correctAnswer}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
