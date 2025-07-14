
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PersonalInfoSection from '@/components/settings/PersonalInfoSection';
import SkinDetailsSection from '@/components/settings/SkinDetailsSection';
import SecuritySection from '@/components/settings/SecuritySection';

const Settings = () => {
  const { user, profile, loading, updateProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form states
  const [formData, setFormData] = useState({
    full_name: '',
    mobile_number: '',
    skin_type: '',
    skin_concerns: [] as string[]
  });
  
  
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (profile) {
      console.log('Setting form data from profile:', profile);
      setFormData({
        full_name: profile.full_name || '',
        mobile_number: profile.mobile_number || '',
        skin_type: profile.skin_type || '',
        skin_concerns: profile.skin_concerns || []
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkinConcernChange = (concern: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      skin_concerns: checked 
        ? [...prev.skin_concerns, concern]
        : prev.skin_concerns.filter(c => c !== concern)
    }));
  };

  const handleSaveProfile = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      console.log('Saving personal info:', {
        full_name: formData.full_name,
        mobile_number: formData.mobile_number
      });
      
      await updateProfile({
        full_name: formData.full_name,
        mobile_number: formData.mobile_number
      });
      
      toast({
        title: "✓ Profile updated!",
        description: "Your profile information has been saved successfully.",
      });
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      const errorMessage = error?.message || 'Failed to update profile. Please try again.';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveSkinDetails = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      console.log('Saving skin details:', {
        skin_type: formData.skin_type,
        skin_concerns: formData.skin_concerns
      });
      
      await updateProfile({
        skin_type: formData.skin_type,
        skin_concerns: formData.skin_concerns
      });
      
      toast({
        title: "✓ Skin details updated!",
        description: "Your skin information and routines have been updated automatically.",
      });

      // Navigate to profile to show updated routines
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
      
    } catch (error: any) {
      console.error('Failed to update skin details:', error);
      const errorMessage = error?.message || 'Failed to update skin details. Please try again.';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.new_password
      });

      if (error) throw error;

      toast({
        title: "Password updated!",
        description: "Your password has been changed successfully.",
      });
      
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password.",
        variant: "destructive",
      });
    }
  };

  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-skin-cream min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-skin-darkgreen hover:bg-skin-darkgreen/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold font-playfair text-skin-darkgreen">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings</p>
        </div>

        <div className="grid gap-6">
          <PersonalInfoSection
            user={user}
            profile={profile}
            formData={{
              full_name: formData.full_name,
              mobile_number: formData.mobile_number
            }}
            isUpdating={isUpdating}
            onInputChange={handleInputChange}
            onSave={handleSaveProfile}
          />

          <SkinDetailsSection
            formData={{
              skin_type: formData.skin_type,
              skin_concerns: formData.skin_concerns
            }}
            isUpdating={isUpdating}
            onInputChange={handleInputChange}
            onSkinConcernChange={handleSkinConcernChange}
            onSave={handleSaveSkinDetails}
          />

          <SecuritySection
            passwordData={passwordData}
            setPasswordData={setPasswordData}
            onPasswordChange={handlePasswordChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
