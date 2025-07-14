
import React from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ExternalLink } from 'lucide-react';

interface Favorite {
  id: string;
  product_name: string;
  product_type: string;
  brand?: string;
  price: string;
  notable_effects?: string;
  product_link?: string;
  created_at: string;
}

interface FavoritesTabProps {
  favorites: Favorite[];
  onRemoveFavorite: (favoriteId: string) => void;
}

const FavoritesTab: React.FC<FavoritesTabProps> = ({ favorites, onRemoveFavorite }) => {
  if (favorites.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <CardTitle className="text-lg mb-2">No favorites yet</CardTitle>
          <CardDescription>
            Start exploring products and add them to your favorites by clicking the heart icon!
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {favorites.map((favorite) => (
        <Card key={favorite.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{favorite.product_name}</h3>
                {favorite.brand && (
                  <p className="text-sm text-gray-600">{favorite.brand}</p>
                )}
                <Badge variant="outline" className="mt-1">
                  {favorite.product_type}
                </Badge>
              </div>
              <div className="text-right">
                <p className="font-semibold text-skin-darkgreen">{favorite.price}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFavorite(favorite.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              </div>
            </div>
            {favorite.notable_effects && (
              <p className="text-sm text-gray-600 mb-3">{favorite.notable_effects}</p>
            )}
            {favorite.product_link && (
              <Button variant="outline" size="sm" asChild>
                <a href={favorite.product_link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Product
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FavoritesTab;
