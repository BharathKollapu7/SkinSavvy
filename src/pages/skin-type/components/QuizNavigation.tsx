
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

const QuizNavigation = ({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  isLastQuestion
}: QuizNavigationProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-pale-mocha/30">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className="w-full sm:w-auto flex items-center justify-center gap-2 btn-ghost disabled:opacity-50 disabled:cursor-not-allowed h-11 px-6 text-base font-medium order-2 sm:order-1"
      >
        <ArrowLeft className="w-4 h-4" /> Previous
      </Button>
      
      <Button
        onClick={onNext}
        className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 shadow-lg h-11 px-8 text-base font-medium order-1 sm:order-2"
      >
        {isLastQuestion ? "See Results" : "Next"}
        {!isLastQuestion && <ArrowRight className="w-4 h-4" />}
      </Button>
    </div>
  );
};

export default QuizNavigation;
