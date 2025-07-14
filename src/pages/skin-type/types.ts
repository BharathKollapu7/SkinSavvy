
export type Option = {
  text: string;
  value: string;
  skinTypePoints: Record<string, number>;
};

export type Question = {
  id: number;
  text: string;
  options: Option[];
};

export type SkinTypePoints = {
  dry: number;
  oily: number;
  combination: number;
  normal: number;
  sensitive: number;
};

export type SkinTypeInfo = {
  description: string;
  recommended: string[];
};

export type AnalysisPattern = {
  pattern: string;
  skinType: string;
  description: string;
  routineTips: string[];
  keyIngredients: string[];
};

export type QuizResponse = {
  questionId: number;
  selectedValue: string;
  selectedText: string;
};

export type AIAnalysisResult = {
  skinType: string;
  confidence: number;
  reasoning: string;
  routineTips: string[];
  keyIngredients: string[];
  hybridTypes?: string[];
};
