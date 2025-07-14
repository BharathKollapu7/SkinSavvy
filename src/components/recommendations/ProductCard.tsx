
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FavoriteButton from './FavoriteButton';
import { Product } from '@/types/recommendations';
import { formatPrice } from '@/utils/recommendations';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="group h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-skin-beige/30 bg-white/95 backdrop-blur-sm hover:border-skin-brown/50">
      <CardContent className="p-4 sm:p-6 flex flex-col h-full">
        {/* Header - Fixed height to ensure alignment */}
        <div className="flex justify-between items-start mb-3 sm:mb-4 min-h-[2rem]">
          <Badge variant="secondary" className="bg-skin-beige/50 text-skin-darkgreen font-lato font-semibold border-skin-beige text-xs sm:text-sm">
            {product.product_type}
          </Badge>
          <FavoriteButton product={product} />
        </div>
        
        {/* Product Name - Fixed height for consistency */}
        <div className="mb-2 sm:mb-3 min-h-[3rem] sm:min-h-[3.5rem]">
          <h3 className="font-bold text-base sm:text-lg text-skin-darkgreen line-clamp-2 group-hover:text-skin-sage transition-colors font-playfair leading-tight">
            {product.product_name}
          </h3>
        </div>
        
        {/* Brand - Fixed height */}
        <div className="mb-2 sm:mb-3 min-h-[1.5rem]">
          <p className="text-skin-brown text-sm font-medium font-lato">
            {product.brand}
          </p>
        </div>
        
        {/* Effects - Flexible height but constrained */}
        <div className="mb-3 sm:mb-4 flex-grow">
          {product.notable_effects && (
            <p className="text-xs text-skin-olive/80 line-clamp-3 leading-relaxed font-lato">
              {product.notable_effects}
            </p>
          )}
        </div>
        
        {/* Price - Fixed position at bottom */}
        <div className="mb-3 sm:mb-4 mt-auto">
          <span className="font-bold text-lg sm:text-xl text-skin-darkgreen font-lato">
            {formatPrice(product.price)}
          </span>
        </div>
        
        {/* Action Button - Fixed at bottom */}
        <div className="mt-auto">
          {product.product_link ? (
            <Button 
              variant="outline" 
              className="w-full border-skin-brown/30 text-skin-brown hover:bg-skin-darkgreen hover:text-white hover:border-skin-darkgreen transition-all duration-200 font-lato font-semibold text-sm sm:text-base h-9 sm:h-10"
              asChild
            >
              <a href={product.product_link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                View Product
              </a>
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full border-skin-beige text-skin-olive/50 cursor-not-allowed font-lato text-sm sm:text-base h-9 sm:h-10"
              disabled
            >
              Not Available
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
