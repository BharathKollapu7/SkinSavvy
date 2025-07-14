import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from 'lucide-react';
import { Product } from '@/types/recommendations';
import { EFFECTS_BY_CATEGORY } from '@/constants/recommendations';

interface FilterPanelProps {
  filters: {
    category: string;
    skinType: string;
    effects: string[];
    brand: string; // "all" for All Brands, or actual brand name
  };
  products: Product[];
  onUpdateFilters: (updates: Partial<{
    category: string;
    skinType: string;
    effects: string[];
    brand: string;
  }>) => void;
  onFindRecommendations: () => void;
  onResetFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  products,
  onUpdateFilters,
  onFindRecommendations,
  onResetFilters,
}) => {
  const categories = [
    ...new Set(products.map(product => product.product_type))
  ];
  const skinTypes = ['Normal', 'Oily', 'Dry', 'Combination', 'Sensitive'];

  // Deduplicate brands and remove "All Brands" if present in data
  const brands = [
    ...new Set(
      products
        .map(product => product.brand)
        .filter(
          (brand) =>
            brand &&
            brand.trim().toLowerCase() !== "all brands"
        )
    ),
  ] as string[];

  // Only show effects for the selected category, from EFFECTS_BY_CATEGORY
  const effects = React.useMemo(() => {
    if (filters.category && EFFECTS_BY_CATEGORY[filters.category]) {
      return EFFECTS_BY_CATEGORY[filters.category];
    }
    return [];
  }, [filters.category]);

  const handleCategoryChange = (value: string) => {
    onUpdateFilters({ category: value, effects: [] }); // Reset effects when category changes
  };

  const handleSkinTypeChange = (value: string) => {
    onUpdateFilters({ skinType: value });
  };

  const handleBrandChange = (value: string) => {
    onUpdateFilters({ brand: value });
  };

  const handleEffectChange = (effect: string, checked: boolean) => {
    const currentEffects = [...filters.effects];
    const updatedEffects = checked
      ? [...currentEffects, effect]
      : currentEffects.filter((e) => e !== effect);
    onUpdateFilters({ effects: updatedEffects });
  };

  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      padding: '2rem', 
      borderRadius: '12px', 
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 1003
    }}>
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-deep-umber mb-3 font-playfair">
          Find Your Perfect Products
        </h2>
        <div className="flex flex-col items-center gap-1 mt-2">
          <span className="text-medium text-sage-grey font-lato">
            <b>Tip:</b> Click <b>Find Products</b> without selecting desired effects to view all products in a selected product category.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Step 1: Category */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-olive-gold text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
              1
            </div>
            <Label htmlFor="category" className="text-base font-semibold text-deep-umber">
              Product Category
            </Label>
          </div>
          <Select
            value={filters.category || "all"}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full h-12 border-pale-mocha focus:border-olive-gold bg-pure-white shadow-sm hover:shadow-md transition-shadow">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-pure-white border-pale-mocha shadow-xl" style={{ zIndex: 2000 }}>
              <SelectItem value="all" className="hover:bg-cream-white focus:bg-cream-white">
                All Products
              </SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="hover:bg-cream-white focus:bg-cream-white">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Step 2: Skin Type */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-warm-taupe text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
              2
            </div>
            <Label htmlFor="skinType" className="text-base font-semibold text-deep-umber">
              Your Skin Type
            </Label>
          </div>
          <Select
            value={filters.skinType || "all"}
            onValueChange={handleSkinTypeChange}
          >
            <SelectTrigger className="w-full h-12 border-pale-mocha focus:border-olive-gold bg-pure-white shadow-sm hover:shadow-md transition-shadow">
              <SelectValue placeholder="Select skin type" />
            </SelectTrigger>
            <SelectContent className="bg-pure-white border-pale-mocha shadow-xl" style={{ zIndex: 2000 }}>
              <SelectItem value="all" className="hover:bg-cream-white focus:bg-cream-white">
                All Skin Types
              </SelectItem>
              {skinTypes.map((skinType) => (
                <SelectItem key={skinType} value={skinType} className="hover:bg-cream-white focus:bg-cream-white">
                  {skinType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Step 3: Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-moss-green text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
              3
            </div>
            <Label htmlFor="brand" className="text-base font-semibold text-deep-umber">
              Preferred Brand
            </Label>
          </div>
          <Select
            value={filters.brand || "all"}
            onValueChange={handleBrandChange}
          >
            <SelectTrigger className="w-full h-12 border-pale-mocha focus:border-olive-gold bg-pure-white shadow-sm hover:shadow-md transition-shadow">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent className="bg-pure-white border-pale-mocha max-h-60 shadow-xl" style={{ zIndex: 2000 }}>
              <SelectItem value="all" className="hover:bg-cream-white focus:bg-cream-white">
                All Brands
              </SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand} className="hover:bg-cream-white focus:bg-cream-white">
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Step 4: Effects */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sage-grey text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
              4
            </div>
            <Label className="text-base font-semibold text-deep-umber">
              Desired Effects
            </Label>
          </div>
          <div className="space-y-3 max-h-36 overflow-y-auto bg-pure-white rounded-lg p-4 border border-pale-mocha shadow-sm">
            {effects.length === 0 ? (
              <div className="text-sage-grey text-sm italic">Select a category to see effects</div>
            ) : (
              effects.map((effect) => (
                <div key={effect} className="flex items-center space-x-3">
                  <Checkbox
                    id={effect}
                    checked={filters.effects.includes(effect)}
                    onCheckedChange={(checked) => handleEffectChange(effect, !!checked)}
                    className="border-pale-mocha data-[state=checked]:bg-olive-gold data-[state=checked]:border-olive-gold"
                  />
                  <Label
                    htmlFor={effect}
                    className="text-sm text-deep-umber cursor-pointer hover:text-olive-gold transition-colors"
                  >
                    {effect}
                  </Label>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-pale-mocha/30">
        <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
          <Button
            onClick={onFindRecommendations}
            className="btn-primary px-10 py-4 text-base font-semibold rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <Search className="h-5 w-5" />
            Find Products
          </Button>
          <span className="text-medium text-sage-grey mt-1 font-lato">
            Swipe down to see products
          </span>
        </div>
        <Button
          onClick={onResetFilters}
          className="btn-ghost px-10 py-4 text-base font-medium rounded-xl flex items-center justify-center gap-3"
        >
          <RefreshCw className="h-5 w-5" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
