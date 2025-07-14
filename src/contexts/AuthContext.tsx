import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/components/ui/use-toast';

type Profile = Tables<'profiles'>;

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    mobileNumber: string,
    skinType: string
  ) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  fetchProfile: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileFetched, setProfileFetched] = useState(false);

  const { toast } = useToast();
  const prevUserRef = useRef<User | null>(null);

  // Helper: Clear all Supabase auth tokens from localStorage
  const clearSupabaseAuthStorage = () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith('sb-'))
      .forEach((key) => localStorage.removeItem(key));
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    mobileNumber: string,
    skinType: string
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
            mobile_number: mobileNumber,
            skin_type: skinType,
          },
        },
      });

      if (error) return { error };

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: fullName,
            mobile_number: mobileNumber,
            skin_type: skinType,
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const ensureProfileExists = useCallback(
    async (userId: string) => {
      try {
        const { data: existingProfile, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (existingProfile) {
          setProfile(existingProfile);
          return existingProfile;
        }

        if (fetchError && fetchError.code === 'PGRST116') {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              full_name: user?.user_metadata?.full_name || '',
              mobile_number: user?.user_metadata?.mobile_number || '',
              skin_type: user?.user_metadata?.skin_type || '',
            })
            .select()
            .single();

          if (createError) {
            console.error('Error creating profile:', createError);
            throw createError;
          }

          setProfile(newProfile);
          return newProfile;
        }

        if (fetchError) {
          console.error('Error fetching profile:', fetchError);
          throw fetchError;
        }
      } catch (error) {
        console.error('Error in ensureProfileExists:', error);
        throw error;
      }
    },
    [user]
  );

  const fetchProfile = useCallback(async () => {
    if (!user || profileFetched) return;

    try {
      await ensureProfileExists(user.id);
      setProfileFetched(true);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }, [user, profileFetched, ensureProfileExists]);

  const refreshProfile = useCallback(async () => {
    if (!user) return;

    try {
      setProfileFetched(false);
      await ensureProfileExists(user.id);
      setProfileFetched(true);
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  }, [user, ensureProfileExists]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No authenticated user');

    try {
      await ensureProfileExists(user.id);

      const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Profile update error:', error);
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setProfileFetched(false);
    clearSupabaseAuthStorage();
    toast({
      title: "Signed out successfully!",
    });
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (event === 'SIGNED_OUT') {
          setProfile(null);
          setProfileFetched(false);
          clearSupabaseAuthStorage();
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user && !profileFetched && !profile) {
      fetchProfile();
    }
  }, [user, profileFetched, profile, fetchProfile]);

  // Toast on successful sign-in (user state transitions from null to a User)
  useEffect(() => {
    if (user && !prevUserRef.current) {
      toast({
        title: "Signed in successfully!",
      });
    }
    prevUserRef.current = user;
  }, [user, toast]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
        fetchProfile,
        refreshProfile,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
