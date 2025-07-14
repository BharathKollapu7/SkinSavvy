
import { useState, useEffect } from 'react';
import { Option, QuizResponse, AIAnalysisResult } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { quizQuestions } from '../data/skinTypeData';
import { analyzeQuizResponses } from '../utils/aiAnalysis';

export const useSkinTypeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [aiAnalysisResult, setAiAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [skinTypeResult, setSkinTypeResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Reset selected option when moving to a new question
  useEffect(() => {
    setSelectedOption(answers[currentQuestion] || null);
  }, [currentQuestion, answers]);

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option.value);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: option.value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswers({});
    setSkinTypeResult(null);
    setAiAnalysisResult(null);
    setIsAnalyzing(false);
  };

  const calculateSkinTypeResult = async () => {
    setIsAnalyzing(true);

    try {
      // Prepare quiz responses for AI analysis
      const quizResponses: QuizResponse[] = Object.entries(answers).map(([questionIdStr, selectedValue]) => {
        const questionId = parseInt(questionIdStr, 10);
        const question = quizQuestions.find(q => q.id === questionId);
        const selectedOption = question?.options.find(opt => opt.value === selectedValue);
        
        return {
          questionId,
          selectedValue,
          selectedText: selectedOption?.text || ''
        };
      });

      // Run AI analysis
      const analysisResult = analyzeQuizResponses(quizResponses);
      setAiAnalysisResult(analysisResult);
      setSkinTypeResult(analysisResult.skinType);

      // Save to database if user is logged in
      if (user) {
        await saveQuizResults(quizResponses, analysisResult);
        await updateUserProfile(analysisResult);
      }

      toast({
        title: "Skin analysis complete! 🎉",
        description: `Your skin type: ${analysisResult.skinType} (${Math.round(analysisResult.confidence * 100)}% confidence)`,
      });

    } catch (error) {
      console.error('Error analyzing quiz results:', error);
      toast({
        title: "Analysis Error",
        description: "There was an issue analyzing your results. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }

    return aiAnalysisResult?.skinType || 'normal';
  };

  const saveQuizResults = async (responses: QuizResponse[], analysis: AIAnalysisResult) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('quiz_responses')
        .insert({
          user_id: user.id,
          quiz_type: 'skin_type',
          responses: responses,
          ai_analysis: analysis,
          determined_skin_type: analysis.skinType,
          confidence_score: analysis.confidence
        });

      if (error) {
        console.error('Error saving quiz results:', error);
      }
    } catch (error) {
      console.error('Error saving quiz results:', error);
    }
  };

  const updateUserProfile = async (analysis: AIAnalysisResult) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          skin_type: analysis.skinType,
          skin_analysis: analysis,
          routine_recommendations: analysis.routineTips,
          key_ingredients: analysis.keyIngredients
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return {
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
  };
};
