import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Loader2, ArrowLeft, CheckCircle, Eye, EyeOff } from 'lucide-react';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton';

// Helper for password strength validation
const passwordStrengthCheck = (password: string) => {
  // At least one lowercase, one uppercase, one digit, one symbol, min 6 chars
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  return pattern.test(password);
};

// Simple random math captcha generator
const generateCaptcha = () => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return {
    question: `What is ${a} + ${b}?`,
    answer: (a + b).toString()
  };
};

const Auth = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  // Password visibility states
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);

  // Captcha state for both forms
  const [signInCaptcha, setSignInCaptcha] = useState(generateCaptcha());
  const [signUpCaptcha, setSignUpCaptcha] = useState(generateCaptcha());
  const [signInCaptchaInput, setSignInCaptchaInput] = useState('');
  const [signUpCaptchaInput, setSignUpCaptchaInput] = useState('');

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    mobileNumber: '',
    skinType: ''
  });

  // Redirect if already authenticated and email verified
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Captcha check
    if (signInCaptchaInput.trim() !== signInCaptcha.answer) {
      setError('Captcha answer is incorrect.');
      setIsSubmitting(false);
      setSignInCaptcha(generateCaptcha());
      setSignInCaptchaInput('');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: signInData.email.trim().toLowerCase(),
      password: signInData.password
    });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        setError('Please verify your email address before signing in.');
      } else if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else {
        setError(error.message);
      }
    }

    setIsSubmitting(false);
    setSignInCaptcha(generateCaptcha());
    setSignInCaptchaInput('');
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSignUpSuccess(false);

    // Captcha check
    if (signUpCaptchaInput.trim() !== signUpCaptcha.answer) {
      setError('Captcha answer is incorrect.');
      setIsSubmitting(false);
      setSignUpCaptcha(generateCaptcha());
      setSignUpCaptchaInput('');
      return;
    }

    // Password strength validation
    if (!passwordStrengthCheck(signUpData.password)) {
      setError('Password must include lowercase, uppercase letters, digits, and symbols (min. 6 characters).');
      setIsSubmitting(false);
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    if (!signUpData.fullName || !signUpData.mobileNumber || !signUpData.skinType) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Try to sign up user using Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email.trim().toLowerCase(),
        password: signUpData.password
      });

      // 2. If user already exists in Supabase Auth, handle error
      if (error) {
        if (
          error.message.toLowerCase().includes('already registered') ||
          error.message.toLowerCase().includes('already exists') ||
          error.message.toLowerCase().includes('duplicate') ||
          error.message.toLowerCase().includes('unique constraint')
        ) {
          setError('An account with this email already exists. Please sign in instead.');
        } else {
          setError(error.message || 'Failed to create account. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      // 3. Add profile to the profiles table (only if user was created)
      const userId = data?.user?.id;
      if (userId) {
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: userId,
            email: signUpData.email.trim().toLowerCase(),
            full_name: signUpData.fullName,
            mobile_number: signUpData.mobileNumber,
            skin_type: signUpData.skinType
          }
        ]);
        if (profileError) {
          setError('Account created, but failed to add profile. Please contact support.');
          setIsSubmitting(false);
          return;
        }
      }

      setSignUpSuccess(true);
    } catch (err: any) {
      setError('An unexpected error occurred. Please try again.');
    }

    setIsSubmitting(false);
    setSignUpCaptcha(generateCaptcha());
    setSignUpCaptchaInput('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-skin-cream px-4">
      <AnimatedCard className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-skin-darkgreen hover:text-skin-sage transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-playfair text-skin-darkgreen">Welcome to SkinSavvy</CardTitle>
          <CardDescription>Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              {/* Google Sign In */}
              <div className="space-y-4">
                <GoogleAuthButton 
                  mode="signin" 
                  onLoading={setIsSubmitting}
                  onError={setError}
                />
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with email
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type={showSignInPassword ? "text" : "password"}
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignInPassword((prev) => !prev)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showSignInPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {/* Captcha */}
                <div className="space-y-2">
                  <Label htmlFor="signin-captcha">Robot Verification *</Label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{signInCaptcha.question}</span>
                    <Button type="button" size="icon" variant="ghost" onClick={() => {
                      setSignInCaptcha(generateCaptcha());
                      setSignInCaptchaInput('');
                    }}>
                      ↻
                    </Button>
                  </div>
                  <Input
                    id="signin-captcha"
                    type="text"
                    autoComplete="off"
                    value={signInCaptchaInput}
                    onChange={e => setSignInCaptchaInput(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              {signUpSuccess ? (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-skin-darkgreen mb-2">Account Created Successfully!</h3>
                    <p className="text-gray-600 mb-4">
                      Your account is now active. You can now sign in.
                    </p>
                    <Button 
                      onClick={() => {
                        setSignUpSuccess(false);
                        // Switch to sign in tab
                        const signInTab = document.querySelector('[value="signin"]') as HTMLElement;
                        signInTab?.click();
                      }}
                      className="w-full"
                    >
                      Go to Sign In
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Google Sign Up */}
                  <div className="space-y-4">
                    <GoogleAuthButton 
                      mode="signup" 
                      onLoading={setIsSubmitting}
                      onError={setError}
                    />
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or create account with email
                        </span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email *</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-fullname">Full Name *</Label>
                      <Input
                        id="signup-fullname"
                        type="text"
                        value={signUpData.fullName}
                        onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-mobile">Mobile Number *</Label>
                      <Input
                        id="signup-mobile"
                        type="tel"
                        value={signUpData.mobileNumber}
                        onChange={(e) => setSignUpData({ ...signUpData, mobileNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-skintype">Skin Type *</Label>
                      <Select value={signUpData.skinType} onValueChange={(value) => setSignUpData({ ...signUpData, skinType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your skin type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oily">Oily</SelectItem>
                          <SelectItem value="dry">Dry</SelectItem>
                          <SelectItem value="combination">Combination</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="sensitive">Sensitive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 relative">
                      <Label htmlFor="signup-password">
                        Password (min. 6 chars, lowercase, uppercase, digit, symbol)
                      </Label>
                      <Input
                        id="signup-password"
                        type={showSignUpPassword ? "text" : "password"}
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignUpPassword((prev) => !prev)}
                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-700"
                        tabIndex={-1}
                      >
                        {showSignUpPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <div className="space-y-2 relative">
                      <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                      <Input
                        id="signup-confirm-password"
                        type={showSignUpConfirmPassword ? "text" : "password"}
                        value={signUpData.confirmPassword}
                        onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignUpConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-700"
                        tabIndex={-1}
                      >
                        {showSignUpConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {/* Captcha */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-captcha">Robot Verification *</Label>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{signUpCaptcha.question}</span>
                        <Button type="button" size="icon" variant="ghost" onClick={() => {
                          setSignUpCaptcha(generateCaptcha());
                          setSignUpCaptchaInput('');
                        }}>
                          ↻
                        </Button>
                      </div>
                      <Input
                        id="signup-captcha"
                        type="text"
                        autoComplete="off"
                        value={signUpCaptchaInput}
                        onChange={e => setSignUpCaptchaInput(e.target.value)}
                        required
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Create Account
                    </Button>
                  </form>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </AnimatedCard>
    </div>
  );
};

export default Auth;
