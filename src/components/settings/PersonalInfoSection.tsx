
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Loader2 } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

interface PersonalInfoSectionProps {
  user: SupabaseUser;
  profile: Profile | null;
  formData: {
    full_name: string;
    mobile_number: string;
  };
  isUpdating: boolean;
  onInputChange: (field: string, value: string) => void;
  onSave: () => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  user,
  profile,
  formData,
  isUpdating,
  onInputChange,
  onSave
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
            <AvatarFallback className="text-lg">
              {profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{profile?.full_name || 'User'}</p>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => onInputChange('full_name', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="mobile_number">Mobile Number</Label>
            <Input
              id="mobile_number"
              value={formData.mobile_number}
              onChange={(e) => onInputChange('mobile_number', e.target.value)}
              placeholder="Enter your mobile number"
            />
          </div>
        </div>
        
        <Button onClick={onSave} disabled={isUpdating}>
          {isUpdating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
