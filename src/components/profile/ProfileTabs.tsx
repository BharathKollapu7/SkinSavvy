
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, ShoppingBag } from 'lucide-react';
import FavoritesTab from './FavoritesTab';
import RoutinesTab from './RoutinesTab';

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

interface SkincareRoutine {
  id: string;
  routine_type: string;
  products: string[];
  created_at: string;
}

interface ProfileTabsProps {
  favorites: Favorite[];
  routines: SkincareRoutine[];
  onRemoveFavorite: (favoriteId: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ favorites, routines, onRemoveFavorite }) => {
  return (
    <Tabs defaultValue="routines" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="routines" className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4" />
          Routines
        </TabsTrigger>
        <TabsTrigger value="favorites" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          Favorites ({favorites.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="routines" className="mt-6">
        <RoutinesTab routines={routines} />
      </TabsContent>

      <TabsContent value="favorites" className="mt-6">
        <FavoritesTab favorites={favorites} onRemoveFavorite={onRemoveFavorite} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
