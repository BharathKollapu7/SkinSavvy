// Simple spell correction for common skincare terms and typos
const spellCorrections: Record<string, string> = {
  // Common skincare terms
  'acnee': 'acne',
  'accne': 'acne',
  'blackheads': 'blackheads',
  'whitheads': 'whiteheads',
  'pimpls': 'pimples',
  'pimples': 'pimples',
  'wrinkles': 'wrinkles',
  'wrinkels': 'wrinkles',
  'moisturizer': 'moisturizer',
  'moistrizer': 'moisturizer',
  'moistruizer': 'moisturizer',
  'cleansers': 'cleansers',
  'clenser': 'cleanser',
  'toner': 'toner',
  'tonner': 'toner',
  'serum': 'serum',
  'serums': 'serums',
  'sunscreen': 'sunscreen',
  'sunscren': 'sunscreen',
  'sunscream': 'sunscreen',
  'retinol': 'retinol',
  'retional': 'retinol',
  'hyaluronic': 'hyaluronic',
  'hialuronic': 'hyaluronic',
  'niacinamide': 'niacinamide',
  'niacimide': 'niacinamide',
  'salicylic': 'salicylic',
  'salicilic': 'salicylic',
  'glycolic': 'glycolic',
  'glicolig': 'glycolic',
  'peptides': 'peptides',
  'peptids': 'peptides',
  'collagen': 'collagen',
  'colagen': 'collagen',
  'exfoliate': 'exfoliate',
  'exfoliat': 'exfoliate',
  'dermatologist': 'dermatologist',
  'dermatolgist': 'dermatologist',
  'routine': 'routine',
  'routin': 'routine',
  'skincare': 'skincare',
  'skincar': 'skincare',
  'skincre': 'skincare',
  
  // Common general typos
  'reccomend': 'recommend',
  'recomend': 'recommend',
  'definitly': 'definitely',
  'definately': 'definitely',
  'seperately': 'separately',
  'occassionally': 'occasionally',
  'beleive': 'believe',
  'recieve': 'receive',
  'wich': 'which',
  'thier': 'their',
  'there': 'their', // context-dependent, but often correct
  'youre': 'you\'re',
  'your': 'you\'re', // context-dependent
  'its': 'it\'s', // context-dependent
  'cant': 'can\'t',
  'dont': 'don\'t',
  'wont': 'won\'t',
  'isnt': 'isn\'t',
  'arent': 'aren\'t',
  'wasnt': 'wasn\'t',
  'werent': 'weren\'t',
  'hasnt': 'hasn\'t',
  'havent': 'haven\'t',
  'hadnt': 'hadn\'t',
  'shouldnt': 'shouldn\'t',
  'wouldnt': 'wouldn\'t',
  'couldnt': 'couldn\'t',
};

export const correctSpelling = (text: string): string => {
  let correctedText = text;
  
  // Split text into words while preserving punctuation and spacing
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  words.forEach(word => {
    if (spellCorrections[word]) {
      // Use regex to replace the word while preserving case and context
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      correctedText = correctedText.replace(regex, (match) => {
        const correction = spellCorrections[word.toLowerCase()];
        
        // Preserve original case
        if (match === match.toUpperCase()) {
          return correction.toUpperCase();
        } else if (match[0] === match[0].toUpperCase()) {
          return correction.charAt(0).toUpperCase() + correction.slice(1);
        }
        return correction;
      });
    }
  });
  
  return correctedText;
};