import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import EditProfileDialog from '@/components/profile/EditProfileDialog';
import ProfilePictureUpload from '@/components/profile/ProfilePictureUpload';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';

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

const Profile = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [routines, setRoutines] = useState<SkincareRoutine[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [profilePictureOpen, setProfilePictureOpen] = useState(false);

  // Only fetch data when user changes or on mount
  useEffect(() => {
    let ignore = false;
    const fetchUserData = async () => {
      if (!user) return;
      setLoadingData(true);
      try {
        const { data: favoritesData } = await supabase
          .from('favorites')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        const { data: routinesData } = await supabase
          .from('skincare_routines')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!ignore) {
          setFavorites(favoritesData || []);
          setRoutines(routinesData || []);
        }
      } catch (error) {
        if (!ignore) {
          setFavorites([]);
          setRoutines([]);
        }
        console.error('Error fetching user data:', error);
      } finally {
        if (!ignore) setLoadingData(false);
      }
    };
    fetchUserData();
    return () => { ignore = true; };
  }, [user]);

  const handleProfileUpdated = useCallback(async () => {
    if (user) {
      setLoadingData(true);
      try {
        const { data: favoritesData } = await supabase
          .from('favorites')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        const { data: routinesData } = await supabase
          .from('skincare_routines')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        setFavorites(favoritesData || []);
        setRoutines(routinesData || []);
      } catch (error) {
        setFavorites([]);
        setRoutines([]);
        console.error('Error refreshing user data:', error);
      } finally {
        setLoadingData(false);
      }
    }
  }, [user]);

  const removeFavorite = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);

      if (error) throw error;

      setFavorites(favorites => favorites.filter(fav => fav.id !== favoriteId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleBackNavigation = () => {
    navigate('/');
  };

  // Redirect to auth if not authenticated
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  // Show loading only when initially loading or when user/profile is not available
  if (loading || !user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-skin-cream">
        <Loader2 className="h-8 w-8 animate-spin text-skin-darkgreen" />
      </div>
    );
  }

  // Check if email is confirmed
  const isEmailConfirmed = user?.email_confirmed_at !== null;

  return (
    <div className="min-h-screen bg-skin-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBackNavigation}
            className="flex items-center gap-2 text-skin-darkgreen hover:bg-skin-darkgreen/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Profile Header */}
        <ProfileHeader
          user={user}
          profile={profile}
          isEmailConfirmed={isEmailConfirmed}
          onEditProfile={() => setEditDialogOpen(true)}
          onProfilePictureEdit={() => setProfilePictureOpen(true)}
          onSignOut={() => {
            setFavorites([]);
            setRoutines([]);
          }}
        />

        {/* Profile Content - Show loading state only for favorites/routines */}
        {loadingData ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-skin-darkgreen" />
          </div>
        ) : (
          <ProfileTabs
            favorites={favorites}
            routines={routines}
            onRemoveFavorite={removeFavorite}
          />
        )}

        <EditProfileDialog 
          open={editDialogOpen} 
          onOpenChange={setEditDialogOpen}
          onProfileUpdated={handleProfileUpdated}
        />

        <ProfilePictureUpload
          open={profilePictureOpen}
          onOpenChange={setProfilePictureOpen}
          onProfileUpdated={handleProfileUpdated}
        />
      </div>
    </div>
  );
};

export default Profile;
