import React from 'react';
import { quizQuestions, skinTypeInfo } from './skin-type/data/skinTypeData';
import { useSkinTypeQuiz } from './skin-type/hooks/useSkinTypeQuiz';
import QuizContainer from './skin-type/components/QuizContainer';
import ResultsDisplay from './skin-type/components/ResultsDisplay';
import { Loader2, Brain } from 'lucide-react';

const SkinType = () => {
  const {
    currentQuestion,
    selectedOption,
    answers,
    skinTypeResult,
    aiAnalysisResult,
    isAnalyzing,
    handleOptionSelect,
    handleNext,
    handlePrevious,
    handleRestart,
    calculateSkinTypeResult,
  } = useSkinTypeQuiz();

  const handleNextQuestion = async () => {
    // If it's the last question, calculate result with AI
    if (currentQuestion === quizQuestions.length - 1) {
      await calculateSkinTypeResult();
    } else {
      // Otherwise, go to next question
      handleNext();
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <div className="card-bright mx-auto max-w-4xl p-8 sm:p-10 lg:p-12">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-deep-umber font-playfair mb-4">
              AI-Powered Skin Type Analysis
            </h1>
           <div className="flex items-center justify-center gap-4 mb-6">
              <Brain className="h-6 w-6 sm:h-7 sm:w-7" />
              <span className="font-normal text-base sm:text-lg">
                Advanced Quiz with Personalized Results
              </span>
            </div>
            <p className="text-sage-grey max-w-3xl mx-auto font-lato text-base sm:text-lg lg:text-xl leading-relaxed px-4 mt-3">
              Answer 10 targeted questions to discover your unique skin type with our AI-driven analysis.
              <br className="hidden sm:block" />
              Get personalized routine tips and ingredient recommendations.
            </p>
          </div>
        </div>

        {/* Main Content */}
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 space-y-8">
            <div className="card-bright max-w-md mx-auto text-center p-8 sm:p-10">
              <Loader2 className="h-12 w-12 sm:h-14 sm:w-14 animate-spin text-skin-darkgreen mx-auto mb-6 sm:mb-8" />
              <h3 className="text-xl sm:text-2xl font-semibold text-skin-darkgreen mb-4 sm:mb-6">
                Analyzing Your Responses...
              </h3>
              <p className="text-sage-grey text-base sm:text-lg leading-relaxed">
                Our AI is processing your answers to determine your unique skin type.
              </p>
            </div>
          </div>
        ) : skinTypeResult ? (
          <ResultsDisplay 
            skinTypeResult={skinTypeResult}
            skinTypeDescription={aiAnalysisResult?.reasoning || ''}
            skinTypeInfo={skinTypeInfo}
            aiAnalysisResult={aiAnalysisResult}
            onRestart={handleRestart}
          />
        ) : (
          <QuizContainer
            questions={quizQuestions}
            currentQuestion={currentQuestion}
            selectedOption={selectedOption}
            answers={answers}
            onOptionSelect={handleOptionSelect}
            onPrevious={handlePrevious}
            onNext={handleNextQuestion}
          />
        )}
      </div>
    </div>
  );
};

export default SkinType;
