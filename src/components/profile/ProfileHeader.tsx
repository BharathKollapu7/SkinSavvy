import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, Mail, Phone, Heart } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

interface ProfileHeaderProps {
  user: User;
  profile: Profile | null;
  isEmailConfirmed: boolean;
  onEditProfile: () => void;
  onProfilePictureEdit: () => void;
  onSignOut: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  profile,
  isEmailConfirmed,
  onEditProfile,
  onProfilePictureEdit,
  onSignOut
}) => {
  const formatSkinConcerns = (concerns: string[] | null) => {
    if (!concerns || concerns.length === 0) return null;
    return concerns.map(concern => 
      concern.replace('_', ' ').charAt(0).toUpperCase() + concern.replace('_', ' ').slice(1)
    ).join(', ');
  };

  return (
    <>
      {!isEmailConfirmed && (
        <Alert className="mb-6">
          <Mail className="h-4 w-4" />
          <AlertDescription>
            Please confirm your email address to access all profile features. Check your inbox for a confirmation email.
          </AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                <AvatarFallback className="text-2xl">
                  {profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                onClick={onProfilePictureEdit}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <CardTitle className="text-2xl font-playfair">{profile?.full_name || 'User'}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2 mt-2">
                <Mail className="h-4 w-4" />
                {user?.email}
              </CardDescription>
              {profile?.mobile_number && (
                <CardDescription className="flex items-center justify-center gap-2 mt-1">
                  <Phone className="h-4 w-4" />
                  {profile.mobile_number}
                </CardDescription>
              )}
              
              {/* Skin Details Section */}
              <div className="mt-3 space-y-2">
                {profile?.skin_type && (
                  <div className="flex items-center justify-center gap-2">
                    <Heart className="h-4 w-4 text-skin-darkgreen" />
                    <Badge variant="secondary" className="bg-skin-lightgreen/20 text-skin-darkgreen">
                      {profile.skin_type.charAt(0).toUpperCase() + profile.skin_type.slice(1)} Skin
                    </Badge>
                  </div>
                )}
                {profile?.skin_concerns && profile.skin_concerns.length > 0 && (
                  <CardDescription className="text-sm text-gray-600 max-w-xs mx-auto">
                    <span className="font-medium">Concerns:</span> {formatSkinConcerns(profile.skin_concerns)}
                  </CardDescription>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default ProfileHeader;
