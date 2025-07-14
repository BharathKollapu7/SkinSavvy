import React from 'react';
import { RefreshCw, Sparkles, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { Product } from '@/types/recommendations';

interface RecommendationsListProps {
  recommendations: Product[];
  onResetFilters: () => void;
  isFiltersApplied?: boolean;
  showNoResultsCard?: boolean; // <-- Add this line
}

const RecommendationsList: React.FC<RecommendationsListProps> = ({
  recommendations,
  onResetFilters,
  isFiltersApplied = false,
  showNoResultsCard = false,
}) => {
  // Ensure recommendations is always an array
  const safeRecommendations = Array.isArray(recommendations) ? recommendations : [];

  // Show the "Try updating your filters" card if requested by parent
  if (showNoResultsCard) {
    return (
      <div className="text-center py-12 px-4">
        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: '2rem', 
          borderRadius: '12px', 
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          maxWidth: '32rem',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1003
        }}>
          <div className="text-6xl mb-6">🔍</div>
          <h3 className="text-2xl font-bold text-deep-umber mb-4 font-playfair">
            No Products Found
          </h3>
          <p className="text-sage-grey mb-6 font-lato text-base leading-relaxed">
            No products match your current filters. Try adjusting your preferences above or reset the filters to start fresh.
          </p>
          <div className="space-y-3">
            <Button
              onClick={onResetFilters}
              className="btn-primary px-6 py-3 font-lato font-semibold"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
            <p className="text-sm text-sage-grey font-lato">
              <span className="font-semibold">💡 Tip:</span> Try selecting different skin types or product categories
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (safeRecommendations.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: '2rem', 
          borderRadius: '12px', 
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          maxWidth: '32rem',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1003
        }}>
          <div className="text-6xl mb-6">
            {isFiltersApplied ? '🔍' : '✨'}
          </div>
          <h3 className="text-2xl font-bold text-deep-umber mb-4 font-playfair">
            {isFiltersApplied ? 'No Products Found' : 'Ready to Find Your Perfect Products?'}
          </h3>
          <p className="text-sage-grey mb-6 font-lato text-base leading-relaxed">
            {isFiltersApplied 
              ? 'No products match your current filters. Try adjusting your preferences above or reset the filters to start fresh.'
              : 'Select your preferences using the filters above and click "Find Products" to discover personalized skincare recommendations just for you.'
            }
          </p>
          <div className="space-y-3">
            {isFiltersApplied && (
              <Button
                onClick={onResetFilters}
                className="btn-primary px-6 py-3 font-lato font-semibold"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            )}
            <p className="text-sm text-sage-grey font-lato">
              <span className="font-semibold">💡 Tip:</span> {
                isFiltersApplied 
                  ? 'Try selecting different skin types or product categories'
                  : 'Use the step-by-step filter panel above to get started'
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" style={{ position: 'relative', zIndex: 1003 }}>
      {/* Results Header */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '2rem', 
        borderRadius: '12px', 
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-6 w-6 text-olive-gold" />
            <h2 className="text-2xl font-bold text-deep-umber font-playfair">
              Your Personalized Recommendations
            </h2>
            <Sparkles className="h-6 w-6 text-olive-gold" />
          </div>
          <div className="flex items-center justify-center gap-2 text-sage-grey font-lato">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-base">
              Found <span className="font-semibold text-deep-umber text-lg">{safeRecommendations.length}</span> product{safeRecommendations.length !== 1 ? 's' : ''} matching your preferences
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {safeRecommendations.map((product, index) => {
          // Add a key check to ensure we have valid product data
          if (!product || !product.product_name) {
            console.warn('Invalid product at index', index, product);
            return null;
          }
          
          return (
            <div 
              key={`${product.product_name}-${product.brand}-${index}`}
              className="animate-fade-in hover:scale-105 transition-transform duration-200"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                position: 'relative',
                zIndex: 1004
              }}
            >
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  );
};

export default RecommendationsList;