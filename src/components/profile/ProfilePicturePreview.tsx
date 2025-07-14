
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ProfilePicturePreviewProps {
  previewUrl: string;
  onRemove: () => void;
}

const ProfilePicturePreview: React.FC<ProfilePicturePreviewProps> = ({ 
  previewUrl, 
  onRemove 
}) => {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-700">Preview</div>
      <div className="flex justify-center">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={previewUrl} alt="Preview" />
            <AvatarFallback>Preview</AvatarFallback>
          </Avatar>
          <Button
            size="sm"
            variant="outline"
            className="absolute -top-2 -right-2 rounded-full h-6 w-6 p-0"
            onClick={onRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicturePreview;
