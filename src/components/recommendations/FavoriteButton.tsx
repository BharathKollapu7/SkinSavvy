
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types/recommendations';

interface FavoriteButtonProps {
  product: Product;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ product }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.email_confirmed_at) {
      checkFavoriteStatus();
    }
  }, [user, product.product_name]);

  const checkFavoriteStatus = async () => {
    if (!user?.email_confirmed_at) return;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_name', product.product_name)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking favorite status:', error);
        return;
      }

      setIsFavorited(!!data);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add products to your favorites.",
        action: (
          <Button variant="outline" onClick={() => navigate('/auth')} size="sm">
            Sign In
          </Button>
        ),
      });
      return;
    }

    if (!user.email_confirmed_at) {
      toast({
        title: "Email confirmation required",
        description: "Please confirm your email address to add favorites.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorited) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('product_name', product.product_name);

        if (error) throw error;

        setIsFavorited(false);
        toast({
          title: "Removed from favorites",
          description: `${product.product_name} has been removed from your favorites.`,
        });
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            product_name: product.product_name,
            product_type: product.product_type,
            brand: product.brand,
            price: product.price,
            notable_effects: product.notable_effects,
            product_link: product.product_link,
          });

        if (error) throw error;

        setIsFavorited(true);
        toast({
          title: "Added to favorites",
          description: `${product.product_name} has been added to your favorites.`,
        });
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleFavoriteClick}
      disabled={isLoading}
      className="p-2 hover:bg-red-50 transition-colors"
    >
      <Heart 
        className={`h-5 w-5 transition-colors ${
          isFavorited 
            ? 'fill-red-500 text-red-500' 
            : 'text-gray-400 hover:text-red-500'
        }`} 
      />
    </Button>
  );
};

export default FavoriteButton;
