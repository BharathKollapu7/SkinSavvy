
import { Product } from '@/types/recommendations';

// Format price to rupees
export const formatPrice = (price: string): string => {
  const cleanPrice = price.replace(/[₹$Rs.]/g, '').trim();
  
  if (cleanPrice.includes('-')) {
    const [min, max] = cleanPrice.split('-').map(p => p.trim());
    return `₹${min} - ₹${max}`;
  }
  
  return `₹${cleanPrice}`;
};

// Filter products based on criteria
export const filterProducts = (
  products: Product[],
  category: string,
  skinType: string,
  effects: string[],
  brand: string
): Product[] => {
  let filtered = products;

  // Filter by category
  filtered = filtered.filter(product => product.product_type === category);

  // Filter by skin type
  if (skinType) {
    filtered = filtered.filter(product => {
      const skinTypeValue = product[skinType as keyof Product];
      return skinTypeValue === 1 || skinTypeValue === '1' || 
             skinTypeValue === 'yes' || skinTypeValue === 'Yes';
    });
  }

  // Filter by effects
  if (effects.length > 0) {
    filtered = filtered.filter(product => {
      if (!product.notable_effects) return false;
      return effects.some(effect => 
        product.notable_effects.toLowerCase().includes(effect.toLowerCase())
      );
    });
  }

  // Filter by brand - treat "All Brands" as no filter
  if (brand && brand !== 'All Brands') {
    filtered = filtered.filter(product => product.brand === brand);
  }

  // Remove duplicates and limit to 5
  const unique = filtered.filter((product, index, self) => 
    index === self.findIndex(p => 
      p.product_name === product.product_name && p.brand === product.brand
    )
  ).slice(0, 5);

  return unique;
};

// Get unique brands from products
export const getUniqueBrands = (products: Product[]): string[] => {
  const brands = products
    .map(p => p.brand)
    .filter(brand => brand && brand.trim() !== '' && brand.toLowerCase() !== 'null')
    .filter((brand, index, self) => self.indexOf(brand) === index)
    .sort();
  
  return brands;
};
