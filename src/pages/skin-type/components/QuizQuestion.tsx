import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Option } from '../types';

interface QuizQuestionProps {
  questionText: string;
  options: Option[];
  selectedOption: string | null;
  onOptionSelect: (option: Option) => void;
}

const QuizQuestion = ({ 
  questionText, 
  options, 
  selectedOption, 
  onOptionSelect 
}: QuizQuestionProps) => {
  return (
    <div className="w-full">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-skin-darkgreen leading-tight px-2">
          {questionText}
        </h2>
      </div>
      
      <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
        {options.map((option, index) => (
          <button
            key={index}
            className={cn(
              "w-full p-4 sm:p-5 text-left rounded-lg border-2 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-olive-gold/50 focus:ring-offset-2",
              selectedOption === option.value
                ? "bg-olive-gold/10 border-olive-gold text-deep-umber shadow-md ring-2 ring-olive-gold/20"
                : "bg-pure-white border-pale-mocha hover:bg-cream-white hover:border-olive-gold/50 text-sage-grey hover:text-deep-umber shadow-sm"
            )}
            onClick={() => onOptionSelect(option)}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 mt-0.5",
                selectedOption === option.value 
                  ? "border-olive-gold bg-olive-gold shadow-sm" 
                  : "border-pale-mocha bg-pure-white"
              )}>
                {selectedOption === option.value && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="font-medium text-sm sm:text-base leading-relaxed text-deep-umber">
                {option.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
