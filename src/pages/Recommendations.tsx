import React, { useState, useEffect, useMemo } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRecommendations } from '@/hooks/useRecommendations';
import FilterPanel from '@/components/recommendations/FilterPanel';
import RecommendationsList from '@/components/recommendations/RecommendationsList';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

const SKIN_TYPE_KEYS = ['oily', 'dry', 'combination', 'normal', 'sensitive'];

const Recommendations = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [localFilters, setLocalFilters] = useState({
    category: "all",
    skinType: "all",
    effects: [],
    brand: "all"
  });
  const [hasSearched, setHasSearched] = useState(false);

  const {
    products,
    loading,
    error,
    refetch,
    updateFilters,
    findRecommendations,
    resetFilters,
  } = useRecommendations();

  // Filtering logic (local)
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    const noFilters =
      (!localFilters.category || localFilters.category === "all") &&
      (!localFilters.skinType || localFilters.skinType === "all") &&
      (!localFilters.effects || localFilters.effects.length === 0) &&
      (!localFilters.brand || localFilters.brand === "" || localFilters.brand === "all");

    if (noFilters) {
      return products;
    }

    return products.filter(product => {
      // Category filter (treat "all" as wildcard)
      if (
        localFilters.category &&
        localFilters.category !== "all" &&
        product.product_type !== localFilters.category
      ) return false;

      // Skin type filter (treat "all" as wildcard)
      if (
        localFilters.skinType &&
        localFilters.skinType !== "all" &&
        SKIN_TYPE_KEYS.includes(localFilters.skinType) &&
        product[localFilters.skinType] !== "1"
      ) return false;

      // Brand filter (treat "all" as wildcard)
      if (
        localFilters.brand &&
        localFilters.brand !== "all" &&
        localFilters.brand !== "" &&
        product.brand !== localFilters.brand
      ) return false;

      // Effects filter (OR logic)
      if (
        localFilters.effects.length > 0 &&
        !localFilters.effects.some(effect =>
          Array.isArray(product.notable_effects)
            ? product.notable_effects.includes(effect)
            : (product.notable_effects || '').toLowerCase().includes(effect.toLowerCase())
        )
      ) {
        return false;
      }

      return true;
    });
  }, [products, localFilters]);

  // Search logic (applied on top of filters)
  const displayProducts = useMemo(() => {
    if (!searchTerm.trim()) return filteredProducts;
    return filteredProducts.filter(product =>
      product?.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [filteredProducts, searchTerm]);

  // Detect if any filters or search are applied
  const isFiltersApplied = useMemo(() => {
    return Boolean(
      searchTerm.trim() ||
      (localFilters.category && localFilters.category !== "all") ||
      (localFilters.skinType && localFilters.skinType !== "all") ||
      (localFilters.effects && localFilters.effects.length > 0) ||
      (localFilters.brand && localFilters.brand !== "" && localFilters.brand !== "all")
    );
  }, [searchTerm, localFilters]);

  // Event handlers
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdateFilters = (updates: Partial<typeof localFilters>) => {
    setLocalFilters(prev => ({ ...prev, ...updates }));
    updateFilters({ ...localFilters, ...updates });
  };

  const handleGetRecommendations = () => {
    setHasSearched(true);
    findRecommendations();
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setLocalFilters({
      category: "all",
      skinType: "all",
      effects: [],
      brand: "all"
    });
    setHasSearched(false);
    resetFilters();
  };

  // Show loading state
  if (loading) {
    return (
      <div style={{ position: 'relative', zIndex: 1000, minHeight: '100vh' }}>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-sm mx-auto" style={{ 
            backgroundColor: '#ffffff', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            position: 'relative',
            zIndex: 1001
          }}>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-olive-gold border-t-transparent mx-auto mb-4"></div>
            <h2 className="text-lg sm:text-xl font-semibold text-deep-umber mb-2 font-playfair">Loading Products</h2>
            <p className="text-sage-grey font-lato text-sm sm:text-base">Finding the perfect skincare products for you...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{ position: 'relative', zIndex: 1000, minHeight: '100vh' }}>
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-md w-full text-center" style={{ 
            backgroundColor: '#ffffff', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            position: 'relative',
            zIndex: 1001
          }}>
            <div className="text-warm-taupe mb-4 text-4xl sm:text-6xl">⚠️</div>
            <h2 className="text-xl sm:text-2xl font-bold text-deep-umber mb-3 font-playfair">Unable to Load Products</h2>
            <p className="text-sage-grey mb-6 font-lato text-sm sm:text-base leading-relaxed">{error}</p>
            <Button 
              onClick={refetch}
              className="btn-primary px-4 sm:px-6 py-3 font-lato text-sm sm:text-base"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', zIndex: 1000, minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6" style={{ position: 'relative', zIndex: 1001 }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div style={{ 
            backgroundColor: '#ffffff', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            maxWidth: '64rem',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1002
          }}>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-olive-gold" />
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-deep-umber font-playfair ">
                Skincare Recommendations
              </h1>
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-olive-gold" />
            </div>
            <p className="text-base sm:text-xl text-sage-grey max-w-3xl mx-auto leading-relaxed font-lato px-2">
              Discover personalized skincare products tailored to your unique skin needs and goals
            </p>
          </div>
        </div>

        {/* Filter Panel */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-5xl" style={{ position: 'relative', zIndex: 1002 }}>
            <FilterPanel
              filters={localFilters}
              products={products}
              onUpdateFilters={handleUpdateFilters}
              onFindRecommendations={handleGetRecommendations}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>

        {/* Product Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-4xl" style={{ position: 'relative', zIndex: 1002 }}>
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '2rem', 
              borderRadius: '12px', 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}>
              <h3 className="text-lg font-semibold text-deep-umber mb-4 font-playfair text-center">
                Search Products by Name
              </h3>
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-grey" />
                  <Input
                    type="text"
                    placeholder="Search products by name or brand..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4 py-3 h-12 text-base border-pale-mocha focus:border-olive-gold focus:ring-olive-gold/20 bg-pure-white shadow-md rounded-xl transition-all duration-200 font-lato"
                  />
                </div>
              </form>
              <p className="text-med text-sage-grey mt-3 text-center font-lato">
                Search for specific products or brands to find your perfect match
              </p>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl" style={{ position: 'relative', zIndex: 1002 }}>
            {hasSearched && (
              <RecommendationsList
                recommendations={displayProducts}
                onResetFilters={handleResetFilters}
                isFiltersApplied={isFiltersApplied}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
