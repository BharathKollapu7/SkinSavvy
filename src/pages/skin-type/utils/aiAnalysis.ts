
import { QuizResponse, AIAnalysisResult, SkinTypePoints } from '../types';
import { analysisPatterns } from '../data/skinTypeData';

export const analyzeQuizResponses = (responses: QuizResponse[]): AIAnalysisResult => {
  // Initialize counters for each skin type
  const skinTypePoints: SkinTypePoints = {
    dry: 0,
    oily: 0,
    combination: 0,
    normal: 0,
    sensitive: 0
  };

  // Count letter frequency for pattern analysis
  const letterCounts = { a: 0, b: 0, c: 0, d: 0, e: 0 };
  
  // Calculate points and letter frequency
  responses.forEach((response) => {
    const letter = response.selectedValue as keyof typeof letterCounts;
    letterCounts[letter]++;
    
    // Add points based on question-specific weights
    const questionId = response.questionId;
    const basePoints = getQuestionPoints(questionId, letter);
    
    Object.entries(basePoints).forEach(([skinType, points]) => {
      const currentPoints = skinTypePoints[skinType as keyof SkinTypePoints];
      const additionalPoints = Number(points) || 0;
      skinTypePoints[skinType as keyof SkinTypePoints] = currentPoints + additionalPoints;
    });
  });

  // AI-driven analysis logic
  const totalResponses = responses.length;
  const dominantTypes = getDominantTypes(skinTypePoints);
  const letterPattern = getLetterPattern(letterCounts, totalResponses);
  
  // Determine skin type using AI logic
  const analysisResult = determineSkintTypeWithAI(
    dominantTypes,
    letterPattern,
    skinTypePoints,
    letterCounts
  );

  return analysisResult;
};

const getQuestionPoints = (questionId: number, letter: string): Record<string, number> => {
  // Weight certain questions more heavily for accuracy
  const criticalQuestions = [1, 2, 10]; // Face feel, midday look, overall description
  const multiplier = criticalQuestions.includes(questionId) ? 1.5 : 1;
  
  const basePoints: Record<string, Record<string, number>> = {
    a: { dry: 3, oily: 0, combination: 0, normal: 0, sensitive: 0 },
    b: { dry: 0, oily: 0, combination: 0, normal: 3, sensitive: 0 },
    c: { dry: 0, oily: 3, combination: 0, normal: 0, sensitive: 0 },
    d: { dry: 0, oily: 0, combination: 3, normal: 0, sensitive: 0 },
    e: { dry: 0, oily: 0, combination: 0, normal: 0, sensitive: 3 }
  };

  const points = basePoints[letter] || {};
  
  // Apply multiplier for critical questions
  return Object.fromEntries(
    Object.entries(points).map(([type, value]) => [type, value * multiplier])
  );
};

const getDominantTypes = (points: SkinTypePoints): string[] => {
  const sortedTypes = Object.entries(points)
    .sort(([,a], [,b]) => b - a)
    .map(([type]) => type);
    
  return sortedTypes.slice(0, 2); // Top 2 types
};

const getLetterPattern = (counts: Record<string, number>, total: number): string => {
  const percentages = Object.fromEntries(
    Object.entries(counts).map(([letter, count]) => [letter, (count / total) * 100])
  );
  
  // Find dominant letter(s)
  const dominant = Object.entries(percentages)
    .filter(([, pct]) => pct >= 40)
    .map(([letter]) => letter);
    
  if (dominant.length === 1) return `mostly_${dominant[0]}`;
  if (dominant.length === 2) return `${dominant[0]}_${dominant[1]}`;
  
  // Check for specific patterns
  if (percentages.a >= 30 && percentages.d >= 30) return 'combination_dry';
  if (percentages.c >= 40 && percentages.e >= 20) return 'oily_sensitive';
  if (percentages.b >= 30 && percentages.d >= 30) return 'normal_combination';
  
  return 'mixed';
};

const determineSkintTypeWithAI = (
  dominantTypes: string[],
  letterPattern: string,
  points: SkinTypePoints,
  letterCounts: Record<string, number>
): AIAnalysisResult => {
  
  // Check for exact pattern matches first
  const patternMatch = analysisPatterns.find(p => p.pattern === letterPattern);
  
  if (patternMatch) {
    return {
      skinType: patternMatch.skinType,
      confidence: 0.9,
      reasoning: `Strong pattern match: ${letterPattern}`,
      routineTips: patternMatch.routineTips,
      keyIngredients: patternMatch.keyIngredients
    };
  }
  
  // AI logic for mixed responses
  const [primaryType, secondaryType] = dominantTypes;
  const primaryScore = points[primaryType as keyof SkinTypePoints];
  const secondaryScore = points[secondaryType as keyof SkinTypePoints];
  
  // Check if it's a clear winner (>40% difference)
  const scoreDifference = primaryScore - secondaryScore;
  const totalScore = Object.values(points).reduce((a, b) => a + b, 0);
  const confidence = primaryScore / totalScore;
  
  if (scoreDifference > totalScore * 0.4) {
    // Clear primary type
    const pattern = analysisPatterns.find(p => p.skinType === primaryType);
    return {
      skinType: primaryType,
      confidence: Math.min(confidence * 1.2, 0.95),
      reasoning: `Clear dominance of ${primaryType} characteristics`,
      routineTips: pattern?.routineTips || [],
      keyIngredients: pattern?.keyIngredients || []
    };
  }
  
  // Handle hybrid types
  if (secondaryType === 'sensitive' && primaryType !== 'sensitive') {
    const hybridType = `${primaryType}-sensitive`;
    const pattern = analysisPatterns.find(p => p.skinType === hybridType);
    
    if (pattern) {
      return {
        skinType: hybridType,
        confidence: 0.85,
        reasoning: `Hybrid type detected: ${primaryType} with sensitivity`,
        routineTips: pattern.routineTips,
        keyIngredients: pattern.keyIngredients,
        hybridTypes: [primaryType, 'sensitive']
      };
    }
  }
  
  // Handle combination-dry pattern
  if ((primaryType === 'combination' && secondaryType === 'dry') || 
      (primaryType === 'dry' && secondaryType === 'combination')) {
    const pattern = analysisPatterns.find(p => p.skinType === 'combination-dry');
    return {
      skinType: 'combination-dry',
      confidence: 0.8,
      reasoning: 'Mixed dry and combination characteristics detected',
      routineTips: pattern?.routineTips || [],
      keyIngredients: pattern?.keyIngredients || [],
      hybridTypes: ['combination', 'dry']
    };
  }
  
  // Default to primary type with lower confidence
  const pattern = analysisPatterns.find(p => p.skinType === primaryType);
  return {
    skinType: primaryType,
    confidence: Math.max(confidence, 0.6),
    reasoning: `Primary type identified with mixed characteristics`,
    routineTips: pattern?.routineTips || [],
    keyIngredients: pattern?.keyIngredients || []
  };
};
