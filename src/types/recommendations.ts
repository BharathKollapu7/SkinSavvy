
// Product type definition
export interface Product {
  product_name: string;
  product_type: string;
  brand: string;
  price: string;
  notable_effects: string;
  product_link: string;
  Normal: string | number;
  Dry: string | number;
  Oily: string | number;
  Combination: string | number;
  Sensitive: string | number;
}

// Filter state interface
export interface FilterState {
  category: string;
  skinType: string;
  effects: string[];
  brand: string;
}
