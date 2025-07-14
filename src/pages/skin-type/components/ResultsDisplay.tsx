
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, RefreshCw, TrendingUp } from 'lucide-react';
import { SkinTypeInfo, AIAnalysisResult } from '../types';

interface ResultsDisplayProps {
  skinTypeResult: string;
  skinTypeDescription: string;
  skinTypeInfo: Record<string, SkinTypeInfo>;
  aiAnalysisResult?: AIAnalysisResult | null;
  onRestart: () => void;
}

const ResultsDisplay = ({
  skinTypeResult,
  skinTypeDescription,
  skinTypeInfo,
  aiAnalysisResult,
  onRestart
}: ResultsDisplayProps) => {
  const result = skinTypeInfo[skinTypeResult] || {
    description: "Based on your answers, we couldn't determine your exact skin type.",
    recommended: ["Consult with a dermatologist for a professional assessment."]
  };

  const confidence = aiAnalysisResult?.confidence ? Math.round(aiAnalysisResult.confidence * 100) : 85;
  const isHighConfidence = confidence >= 80;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Main Result Card */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="bg-green-100 rounded-full p-3 mb-4">
            <Check className="h-8 w-8 text-skin-darkgreen" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-skin-darkgreen mb-2 capitalize">
            {skinTypeResult.replace('-', ' ')} Skin Type
          </h2>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-skin-sage" />
            <span className={`text-sm font-medium ${isHighConfidence ? 'text-green-600' : 'text-yellow-600'}`}>
              {confidence}% Confidence Match
            </span>
          </div>
          <p className="text-gray-700 max-w-2xl leading-relaxed">
            {result.description}
          </p>
        </div>

        {aiAnalysisResult?.hybridTypes && aiAnalysisResult.hybridTypes.length > 0 && (
          <div className="bg-white/50 rounded-lg p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-gray-500">Detected characteristics:</span>
              {aiAnalysisResult.hybridTypes.map((type, index) => (
                <span 
                  key={index}
                  className="bg-skin-beige/30 text-skin-darkgreen px-2 py-1 rounded-full text-xs font-medium"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Routine Tips */}
        <div className="mb-6">
          <h3 className="font-bold text-xl text-skin-darkgreen mb-4">
            Personalized Routine Tips:
          </h3>
          <ul className="space-y-2">
            {(aiAnalysisResult?.routineTips || result.recommended).map((item, index) => (
              <li 
                key={index}
                className="flex items-start gap-3 text-gray-700"
              >
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Ingredients */}
        {aiAnalysisResult?.keyIngredients && aiAnalysisResult.keyIngredients.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold text-xl text-skin-darkgreen mb-4">
              Key Ingredients for Your Skin:
            </h3>
            <div className="flex flex-wrap gap-2">
              {aiAnalysisResult.keyIngredients.map((ingredient, index) => (
                <span 
                  key={index}
                  className="bg-skin-darkgreen/10 text-skin-darkgreen px-3 py-1 rounded-full text-sm font-medium border border-skin-darkgreen/20"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Additional Recommendations */}
      {result.recommended && result.recommended.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-lg text-skin-darkgreen mb-4">
            Additional Product Recommendations:
          </h3>
          <ul className="space-y-2">
            {result.recommended.map((item, index) => (
              <li 
                key={index}
                className="flex items-start gap-2 text-gray-700"
              >
                <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="flex justify-center">
        <Button
          variant="outline" 
          onClick={onRestart}
          className="flex items-center gap-2 hover:bg-skin-darkgreen hover:text-white transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Retake Quiz
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
