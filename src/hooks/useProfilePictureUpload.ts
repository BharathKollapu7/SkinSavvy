
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useProfilePictureUpload = () => {
  const { user, setProfile } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Upload profile picture
  const uploadProfilePicture = useCallback(
    async (file: File, onSuccess: () => void) => {
      if (!user) return;

      setIsUploading(true);
      setError(null);

      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        const timestampedUrl = `${publicUrl}?ts=${Date.now()}`;

        const { error: updateError } = await supabase
          .from('profiles')
          .update({ avatar_url: timestampedUrl })
          .eq('id', user.id);

        if (updateError) {
          throw new Error(`Failed to update profile: ${updateError.message}`);
        }

        // Instantly update profile state for UI
        if (setProfile) {
          setProfile(prev => prev ? { ...prev, avatar_url: timestampedUrl } : prev);
        }

        toast({
          title: "✓ Profile picture updated",
          description: "Your profile picture has been updated successfully.",
        });

        onSuccess();

      } catch (error: any) {
        setError(error.message || 'Failed to upload profile picture. Please try again.');
      } finally {
        setIsUploading(false);
      }
    },
    [user, toast, setProfile]
  );

  // Delete profile picture
  const deleteProfilePicture = useCallback(
    async (avatarUrl: string, onSuccess?: () => void) => {
      if (!user || !avatarUrl) return;

      setIsUploading(true);
      setError(null);

      try {
        const regex = /\/avatars\/(.+)$/;
        const match = avatarUrl.match(regex);
        if (!match || !match[1]) throw new Error('Invalid avatar URL.');

        const filePath = match[1];

        const { error: removeError } = await supabase.storage
          .from('avatars')
          .remove([filePath]);
        if (removeError) {
          throw new Error(`Failed to delete image: ${removeError.message}`);
        }

        const { error: updateError } = await supabase
          .from('profiles')
          .update({ avatar_url: null })
          .eq('id', user.id);

        if (updateError) {
          throw new Error(`Failed to update profile: ${updateError.message}`);
        }

        // Instantly update profile state for UI
        if (setProfile) {
          setProfile(prev => prev ? { ...prev, avatar_url: null } : prev);
        }

        toast({
          title: "✓ Profile picture deleted",
          description: "Your profile picture has been removed.",
        });

        if (onSuccess) onSuccess();

      } catch (error: any) {
        setError(error.message || 'Failed to delete profile picture. Please try again.');
      } finally {
        setIsUploading(false);
      }
    },
    [user, toast, setProfile]
  );

  return {
    uploadProfilePicture,
    deleteProfilePicture,
    isUploading,
    error,
    setError,
  };
};
