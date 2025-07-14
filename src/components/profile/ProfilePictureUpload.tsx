
import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Upload, Trash2 } from 'lucide-react';
import { useProfilePictureUpload } from '@/hooks/useProfilePictureUpload';
import { validateImageFile } from '@/utils/fileValidation';
import ProfilePicturePreview from './ProfilePicturePreview';

interface ProfilePictureUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProfileUpdated: () => void;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({ 
  open, 
  onOpenChange, 
  onProfileUpdated 
}) => {
  const { profile, setProfile } = useAuth(); // <-- Ensure setProfile is available
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const { uploadProfilePicture, deleteProfilePicture, isUploading, error, setError } = useProfilePictureUpload();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSelectedFile(file);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    await uploadProfilePicture(selectedFile, () => {
      // Optionally update profile state here if needed
      onProfileUpdated();
      onOpenChange(false);
      handleReset();
    });
  };

  const handleDelete = async () => {
    if (!profile?.avatar_url) return;
    setError(null);
    try {
      await deleteProfilePicture(profile.avatar_url, () => {
        // Instantly update profile state so UI reflects removal
        if (setProfile) {
          setProfile((prev: any) => ({
            ...prev,
            avatar_url: null,
          }));
        }
        onProfileUpdated();
        onOpenChange(false);
        handleReset();
      });
    } catch (err: any) {
      setError(err.message || "Failed to delete profile picture.");
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      handleReset();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogDescription>
            Upload a new profile picture. Accepted formats: JPG, PNG, WebP (max 5MB).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Current Avatar */}
          <div className="flex flex-col items-center space-y-4">
            <div className="text-sm font-medium text-gray-700">Current Picture</div>
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
              <AvatarFallback className="text-lg">
                {profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            {profile?.avatar_url && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isUploading}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete Picture
              </Button>
            )}
          </div>

          {/* File Input */}
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
              disabled={isUploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose New Picture
            </Button>
          </div>

          {/* Preview */}
          {previewUrl && (
            <ProfilePicturePreview
              previewUrl={previewUrl}
              onRemove={handleReset}
            />
          )}

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              'Upload Picture'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePictureUpload;
