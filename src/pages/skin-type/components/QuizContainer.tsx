
import React from 'react';
import { Card } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animated-card';
import { useToast } from '@/hooks/use-toast';
import QuizProgressBar from './QuizProgressBar';
import QuizQuestion from './QuizQuestion';
import QuizNavigation from './QuizNavigation';
import { Question, Option } from '../types';

interface QuizContainerProps {
  questions: Question[];
  currentQuestion: number;
  selectedOption: string | null;
  answers: Record<number, string>;
  onOptionSelect: (option: Option) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const QuizContainer = ({
  questions,
  currentQuestion,
  selectedOption,
  answers,
  onOptionSelect,
  onPrevious,
  onNext
}: QuizContainerProps) => {
  const { toast } = useToast();
  
  const handleNext = () => {
    if (selectedOption === null) {
      toast({
        title: "Please select an option",
        description: "You need to select an answer to continue.",
        variant: "destructive",
      });
      return;
    }
    onNext();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <QuizProgressBar 
          currentQuestion={currentQuestion} 
          totalQuestions={questions.length}
        />
      </div>
      
      <AnimatedCard className="card-bright shadow-xl border-pale-mocha/20 w-full">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          <QuizQuestion
            questionText={questions[currentQuestion].text}
            options={questions[currentQuestion].options}
            selectedOption={selectedOption}
            onOptionSelect={onOptionSelect}
          />
          
          <QuizNavigation
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            onPrevious={onPrevious}
            onNext={handleNext}
            isLastQuestion={currentQuestion === questions.length - 1}
          />
        </div>
      </AnimatedCard>
    </div>
  );
};

export default QuizContainer;
