
// Product categories available
export const PRODUCT_CATEGORIES = [
  'Face Wash',
  'Serum',
  'Toner',
  'Moisturizer',
  'Sunscreen'
];

// Skin types
export const SKIN_TYPES = [
  'Normal',
  'Dry',
  'Oily',
  'Combination',
  'Sensitive'
];

// Effects by product category
export const EFFECTS_BY_CATEGORY: Record<string, string[]> = {
  'Face Wash': [
    'Brightens Skin',
    'Cleanses Skin',
    'Controls Acne',
    'Hydrates Skin',
    'Reduces Acne',
    'Removes Tan',
    'Controls Oil'
  ],
  'Serum': [
    'Brightens Skin',
    'Reduces Dark Spots',
    'Hydrates Skin',
    'Minimizes Pores',
    'Reduces Wrinkles',
    'Even Tone Skin',
    'Glowing Skin'
  ],
  'Toner': [
    'Hydrates Skin',
    'Minimizes Pores',
    'Brightens Skin',
    'Even Tone Skin',
    'Controls Oil'
  ],
  'Moisturizer': [
    'Hydrates Skin',
    'Smooth Skin',
    'Reduces Wrinkles',
    'Brightens Skin',
    'Even Tone Skin'
  ],
  'Sunscreen': [
    'SPF 20',
    'SPF 35 PA+++',
    'SPF 40 PA++',
    'SPF 45 PA+++',
    'SPF 50 PA+++',
    'SPF 50 PA++++',
    'SPF 50+',
    'SPF 50+ PA++++',
    'SPF 60 PA++++',
    'Brightens Skin',
    'Hydrates Skin',
    'Removes Tan',
    'Glowing Skin'
  ]
};
