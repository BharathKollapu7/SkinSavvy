
import React from 'react';

interface QuizProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const QuizProgressBar = ({ currentQuestion, totalQuestions }: QuizProgressBarProps) => {
  const progress = (currentQuestion  / totalQuestions) * 100;
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between mb-2 text-sm sm:text-base text-skin-darkgreen font-medium">
        <span>Question {currentQuestion + 1} of {totalQuestions}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-2 sm:h-3 bg-gray-200 rounded-full shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-skin-darkgreen to-olive-gold rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizProgressBar;
