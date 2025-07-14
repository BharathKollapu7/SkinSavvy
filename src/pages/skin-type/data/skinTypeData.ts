
import { Question, SkinTypeInfo, AnalysisPattern } from '../types';

export const quizQuestions: Question[] = [
  {
    id: 1,
    text: "After washing your face and waiting 30 minutes (no products added), how does it feel?",
    options: [
      { text: "Tight or flaky", value: "a", skinTypePoints: { dry: 3, oily: 0, combination: 0, normal: 0, sensitive: 0 } },
      { text: "Smooth and comfortable", value: "b", skinTypePoints: { dry: 0, oily: 0, combination: 0, normal: 3, sensitive: 0 } },
      { text: "Shiny (greasy looking) all over", value: "c", skinTypePoints: { dry: 0, oily: 3, combination: 0, normal: 0, sensitive: 0 } },
      { text: "Shiny on nose/forehead/chin, but dry on cheeks", value: "d", skinTypePoints: { dry: 0, oily: 0, combination: 3, normal: 0, sensitive: 0 } },
      { text: "Red, itchy, or burning", value: "e", skinTypePoints: { dry: 0, oily: 0, combination: 0, normal: 0, sensitive: 3 } },
    ],
  },
  {
    id: 2,
    text: "By the middle of the day, how does your face usually look?",
    options: [
      { text: "Still dry", value: "a", skinTypePoints: { dry: 3, oily: 0, combination: 0, normal: 0, sensitive: 0 } },
      { text: "Even — not oily or dry", value: "b", skinTypePoints: { dry: 0, oily: 0, combination: 0, normal: 3, sensitive: 0 } },
      { text: "Looks shiny or greasy all over", value: "c", skinTypePoints: { dry: 0, oily: 3, combination: 0, normal: 0, sensitive: 0 } },
      { text: "Forehead, nose, and chin look oily, cheeks look normal or dry", value: "d", skinTypePoints: { dry: 0, oily: 0, combination: 3, normal: 0, sensitive: 0 } },
      { text: "Gets red, itchy, or reacts easily", value: "e", skinTypePoints: { dry: 0, oily: 0, combination: 0, normal: 0, sensitive: 3 } },
    ],
  },
  {
    id: 3,
    text: "What happens when you try new skincare or makeup products?",
    options: [
      { text: "No reaction", value: "a", skinTypePoints: { dry: 2, oily: 0, combination: 0, normal: 1, sensitive: 0 } },
      { text: "Sometimes feels different, but no problem", value: "b", skinTypePoints: { dry: 0, oily: 0, combination: 1, normal: 2, sensitive: 0 } },
      { text: "Often get pimples or clogged pores", value: "c", skinTypePoints: { dry: 0, oily: 3, combination: 0, normal: 0, sensitive: 0 } },
      { text: "Breakouts happen only in the center of the face", value: "d", skinTypePoints: { dry: 0, oily: 0, combination: 3, normal: 0, sensitive: 0 } },
      { text: "Stings, burns, or gets red quickly", value: "e", skinTypePoints: { dry: 0, oily: 0, combination: 0, normal: 0, sensitive: 3 } },
    ],
  },
  {
    id: 4,
    text: "Look at your pores (tiny openings on the skin) in the mirror — what do you notice?",
    options: [
      { text: "Very small, barely visible", value: "a", skinTypePoints: { dry: 3, oily: 0, combination: 0, normal: 1, sensitive: 0 } },
      { text: "Small and even across your face", value: "b", skinTypePoints: { dry: 0, oily: 0, combination: 0, normal: 3, sensitive: 0 } },
      { text: "Large and easy to see, especially near nose or forehead", value: "c", skinTypePoints: { dry: 0, oily: 3, combination: 1, normal: 0, sensitive: 0 } },
      { text: "Larger in middle of face (forehead, nose, chin), smaller on cheeks", value: "d", skinTypePoints: { dry: 0, oily: 0, combination: 3, normal: 0, sensitive: 0 } },
      { text: "Skin looks irritated or bumpy", value: "e", skinTypePoints: { dry: 0, oily: 0, combination: 0, normal: 0, sensitive: 3 } },
    ],
  },
  {
    id: 5,
    text: "Do you get dry, rough, or flaky patches?",
    options: [
      { text: "Often", value: "a", skinTypePoints: { dry: 3, oily: 0, combination: 0, normal: 0, sensitive: 1 } },
      { text: "Rarely", value: "b", skinTypePoints: { dry: 0, oily: 1, combination: 0, normal: 3, sensitive: 0 } },
      { text: "Hardly ever", value: "c", skinTypePoints: { dry: 0, oily: 3, combination: 0, normal: 1, sensitive: 0 } },
      { text: "Only on cheeks or around mouth", value: "d", skinTypePoints: { dry: 1, oily: 0, combination: 3, normal: 0, sensitive: 0 } },
      { text: "Yes, and they feel itchy or irritated", value: "e", skinTypePoints: { dry: 1, oily: 0, combination: 0, normal: 0, sensitive: 3 } },
    ],
  },
  {
    id: 6,
    text: "How often do you get breakouts (pimples, blackheads, whiteheads)?",
    options: [
      { text: "Rarely", value: "a", skinTypePoints: { dry: 3, oily: 0, combination: 0, normal: 2, sensitive: 0 } },
      { text: "Occasionally", value: "b", skinTypePoints: { dry: 0, oily: 1, combination: 1, normal: 3, sensitive: 0 } },
      { text: "Frequently — mostly oily areas", value: "c", skinTypePoints: { dry: 0, oily: 3, combination: 1, normal: 0, sensitive: 0 } },
      { text: "Only in center of face", value: "d", skinTypePoints: { dry: 0, oily: 0, combination: 3, normal: 0, sensitive: 0 } },
      { text: "After using new products or in harsh weather", value: "e", skinTypePoints: { dry: 0, oily: 0, combination: 0, normal: 0, sensitive: 3 } },
    ],
  },
  {
    id: 7,
    text: "How does your face feel in hot or cold weather?",
    options: [
      { text: "Feels very dry or tight", value: "a", skinTypePoints: { dry: 3, oily: 0, combination: 0, normal: 0, sensitive: 1 } },
      { text: "Mostly normal", value: "b", skinTypePoints: { dry: 0, oily: 0, combination: 0, normal: 3, sensitive: 0 } },
      { text: "Gets oily easily", value: "c", skinTypePoints: { dry: 0, oily: 3, combination: 0, normal: 0, sensitive: 0 } },
      { text: "Dry in winter, oily in summer", value: "d", skinTypePoints: { dry: 1, oily: 1, combination: 3, normal: 0, sensitive: 0 } },
      { text: "Reacts — turns red, burns, or itches", value: "e", skinTypePoints: { dry: 0, oily: 0, combination: 0, normal: 0, sensitive: 3 } },
    ],
  },
  {
    id: 8,
    text: "Do you have sensitive skin? (Gets red, itchy, or reacts to many products)",
    options: [
      { text: "No", value: "a", skinTypePoints: { dry: 1, oily: 1, combination: 1, normal: 2, sensitive: 0 } },
      { text: "A little bit", value: "b", skinTypePoints: { dry: 0, oily: 0, combination: 1, normal: 2, sensitive: 1 } },
      { text: "Not really", value: "c", skinTypePoints: { dry: 0, oily: 2, combination: 0, normal: 1, sensitive: 0 } },
      { text: "Only in dry areas", value: "d", skinTypePoints: { dry: 1, oily: 0, combination: 2, normal: 0, sensitive: 1 } },
      { text: "Yes, very sensitive", value: "e", skinTypePoints: { dry: 0, oily: 0, combination: 0, normal: 0, sensitive: 3 } },
    ],
  },
  {
    id: 9,
    text: "After washing, how quickly do you feel like using a moisturizer?",
    options: [
      { text: "Right away", value: "a", skinTypePoints: { dry: 3, oily: 0, combination: 1, normal: 0, sensitive: 1 } },
      { text: "After a little while", value: "b", skinTypePoints: { dry: 1, oily: 0, combination: 0, normal: 3, sensitive: 0 } },
      { text: "Don't feel the need", value: "c", skinTypePoints: { dry: 0, oily: 3, combination: 0, normal: 0, sensitive: 0 } },
      { text: "Only on dry areas like cheeks", value: "d", skinTypePoints: { dry: 0, oily: 0, combination: 3, normal: 0, sensitive: 0 } },
      { text: "Yes, but it must be very gentle", value: "e", skinTypePoints: { dry: 1, oily: 0, combination: 0, normal: 0, sensitive: 3 } },
    ],
  },
  {
    id: 10,
    text: "Overall, how would you describe your skin?",
    options: [
      { text: "Dry and rough", value: "a", skinTypePoints: { dry: 3, oily: 0, combination: 0, normal: 0, sensitive: 0 } },
      { text: "Smooth and balanced", value: "b", skinTypePoints: { dry: 0, oily: 0, combination: 0, normal: 3, sensitive: 0 } },
      { text: "Oily and shiny", value: "c", skinTypePoints: { dry: 0, oily: 3, combination: 0, normal: 0, sensitive: 0 } },
      { text: "Dry in some areas, oily in others", value: "d", skinTypePoints: { dry: 0, oily: 0, combination: 3, normal: 0, sensitive: 0 } },
      { text: "Easily irritated or reactive", value: "e", skinTypePoints: { dry: 0, oily: 0, combination: 0, normal: 0, sensitive: 3 } },
    ],
  },
];

export const analysisPatterns: AnalysisPattern[] = [
  {
    pattern: "mostly_a",
    skinType: "dry",
    description: "Your skin tends to be dry, often feeling tight or flaky. You may experience a lack of elasticity and visible fine lines due to moisture deficiency.",
    routineTips: [
      "Hydrating cleanser",
      "Rich moisturizer", 
      "Daily SPF"
    ],
    keyIngredients: ["Hyaluronic acid", "ceramides", "squalane"]
  },
  {
    pattern: "mostly_b", 
    skinType: "normal",
    description: "You have well-balanced skin with good circulation, small pores, and even texture. Your skin rarely feels too dry or too oily.",
    routineTips: [
      "Gentle cleanser",
      "Balanced moisturizer",
      "Daily SPF"
    ],
    keyIngredients: ["Niacinamide", "antioxidants", "SPF"]
  },
  {
    pattern: "mostly_c",
    skinType: "oily", 
    description: "Your skin produces excess sebum, resulting in shine throughout the day and potentially enlarged pores. You may be prone to breakouts and blackheads.",
    routineTips: [
      "Oil-control cleanser",
      "Light, non-comedogenic moisturizer",
      "Daily SPF"
    ],
    keyIngredients: ["Salicylic acid", "niacinamide", "zinc PCA"]
  },
  {
    pattern: "mostly_d",
    skinType: "combination",
    description: "Your skin has both oily and dry areas - typically oily in the T-zone (forehead, nose, and chin) and normal to dry on the cheeks and jawline.",
    routineTips: [
      "Zone-targeted moisturizer",
      "Balancing cleanser", 
      "Daily SPF"
    ],
    keyIngredients: ["Hyaluronic acid", "niacinamide", "AHAs/BHAs"]
  },
  {
    pattern: "mostly_e",
    skinType: "sensitive",
    description: "Your skin reacts easily to products or environmental factors, often becoming red, itchy, or irritated. You may experience stinging sensations with many products.",
    routineTips: [
      "Fragrance-free cleanser",
      "Barrier-repair moisturizer",
      "Mineral SPF"
    ],
    keyIngredients: ["Niacinamide", "colloidal oatmeal", "centella asiatica"]
  },
  {
    pattern: "combination_dry",
    skinType: "combination-dry",
    description: "You have both combination and dry characteristics, with some areas being oily while others remain consistently dry and may feel tight.",
    routineTips: [
      "Hydrate dry zones",
      "Use gel moisturizers in T-zone", 
      "Avoid harsh exfoliants"
    ],
    keyIngredients: ["Hyaluronic acid", "glycerin", "ceramides"]
  },
  {
    pattern: "oily_sensitive", 
    skinType: "oily-sensitive",
    description: "Your skin is both oily and sensitive, producing excess sebum while also being reactive to products. You may experience shine along with redness or irritation.",
    routineTips: [
      "Use calming, oil-controlling products",
      "Avoid alcohol/fragrance"
    ],
    keyIngredients: ["Niacinamide", "green tea extract", "zinc"]
  },
  {
    pattern: "normal_combination",
    skinType: "normal-combination", 
    description: "Your skin is generally well-balanced but has slight combination characteristics, with minor variations between different facial zones.",
    routineTips: [
      "Lightweight hydration",
      "Balance both zones"
    ],
    keyIngredients: ["Niacinamide", "squalane", "AHAs"]
  }
];

export const skinTypeInfo: Record<string, SkinTypeInfo> = {
  dry: {
    description: "Your skin tends to be dry, often feeling tight or flaky. You may experience a lack of elasticity and visible fine lines due to moisture deficiency.",
    recommended: [
      "Hydrating cleansers with ceramides",
      "Rich moisturizers with hyaluronic acid", 
      "Nourishing facial oils",
      "Weekly hydrating masks"
    ]
  },
  oily: {
    description: "Your skin produces excess sebum, resulting in shine throughout the day and potentially enlarged pores. You may be prone to breakouts and blackheads.",
    recommended: [
      "Gentle foaming cleansers",
      "Oil-free, non-comedogenic moisturizers",
      "Products with salicylic acid or niacinamide",
      "Weekly clay masks"
    ]
  },
  combination: {
    description: "Your skin has both oily and dry areas - typically oily in the T-zone (forehead, nose, and chin) and normal to dry on the cheeks and jawline.",
    recommended: [
      "Balancing cleansers", 
      "Lightweight, hydrating moisturizers",
      "Targeted treatments for different zones",
      "Weekly multi-masking"
    ]
  },
  normal: {
    description: "You have well-balanced skin with good circulation, small pores, and even texture. Your skin rarely feels too dry or too oily.",
    recommended: [
      "Gentle, pH-balanced cleansers",
      "Lightweight moisturizers", 
      "Antioxidant serums for maintenance",
      "Weekly exfoliation"
    ]
  },
  sensitive: {
    description: "Your skin reacts easily to products or environmental factors, often becoming red, itchy, or irritated. You may experience stinging sensations with many products.",
    recommended: [
      "Fragrance-free, gentle cleansers",
      "Soothing moisturizers with ceramides",
      "Products free from common irritants", 
      "Minimal ingredient formulations"
    ]
  },
  "combination-dry": {
    description: "You have both combination and dry characteristics, with some areas being oily while others remain consistently dry and may feel tight.",
    recommended: [
      "Hydrate dry zones specifically",
      "Use gel moisturizers in T-zone",
      "Avoid harsh exfoliants",
      "Zone-specific treatments"
    ]
  },
  "oily-sensitive": {
    description: "Your skin is both oily and sensitive, producing excess sebum while also being reactive to products. You may experience shine along with redness or irritation.",
    recommended: [
      "Calming, oil-controlling products", 
      "Fragrance-free formulations",
      "Gentle, non-comedogenic moisturizers",
      "Soothing ingredients like niacinamide"
    ]
  },
  "normal-combination": {
    description: "Your skin is generally well-balanced but has slight combination characteristics, with minor variations between different facial zones.",
    recommended: [
      "Lightweight, balanced hydration",
      "Zone-aware skincare routine",
      "Gentle, effective ingredients", 
      "Maintenance-focused products"
    ]
  }
};
