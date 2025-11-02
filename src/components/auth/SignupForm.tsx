import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, X } from 'lucide-react';

interface SignupFormProps {
  onSuccess?: () => void;
}

interface PasswordStrength {
  score: number;
  level: 'weak' | 'medium' | 'strong';
  feedback: string[];
}

const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    level: 'weak',
    feedback: [],
  });

  const calculatePasswordStrength = (pwd: string): PasswordStrength => {
    const feedback: string[] = [];
    let score = 0;

    if (!pwd) {
      return { score: 0, level: 'weak', feedback: ['Enter a password'] };
    }

    if (pwd.length >= 8) score++;
    else feedback.push('At least 8 characters');

    if (pwd.length >= 12) score++;
    else if (pwd.length >= 8) feedback.push('12+ characters for stronger security');

    if (/[a-z]/.test(pwd)) score++;
    else feedback.push('Lowercase letters');

    if (/[A-Z]/.test(pwd)) score++;
    else feedback.push('Uppercase letters');

    if (/[0-9]/.test(pwd)) score++;
    else feedback.push('Numbers');

    if (/[^a-zA-Z0-9]/.test(pwd)) score++;
    else feedback.push('Special characters');

    let level: 'weak' | 'medium' | 'strong' = 'weak';
    if (score >= 4) level = 'strong';
    else if (score >= 3) level = 'medium';

    return { score, level, feedback: feedback.slice(0, 2) };
  };

  const validateForm = (): boolean => {
    if (!fullName.trim()) {
      toast.error('Full name is required');
      return false;
    }

    if (!email.trim()) {
      toast.error('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return false;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    if (passwordStrength.level === 'weak') {
      toast.error('Password is too weak. Please add more complexity.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('Email already registered', {
            description: 'Try logging in or use a different email address.',
          });
        } else if (error.message.includes('password')) {
          toast.error('Invalid password', {
            description: error.message,
          });
        } else {
          toast.error('Signup failed', {
            description: error.message,
          });
        }
      } else if (data?.user) {
        toast.success('Account created successfully!', {
          description: 'Check your email to confirm your account.',
        });
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        onSuccess?.();
      }
    } catch (error) {
      toast.error('An unexpected error occurred', {
        description: error instanceof Error ? error.message : 'Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        toast.error('Google signup failed', {
          description: error.message,
        });
      }
    } catch (error) {
      toast.error('Google signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignUp = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        toast.error('Apple signup failed', {
          description: error.message,
        });
      }
    } catch (error) {
      toast.error('Apple signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 0 24 24"
            width="20"
            className="mr-2"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
        <Button
          variant="outline"
          onClick={handleAppleSignUp}
          disabled={loading}
          className="w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path d="M17.05 13.5c-.91 0-1.82.58-2.57 1.41.64.81 1.18 1.96 1.18 3.09 0 2.18-1.66 3.5-3.66 3.5-1.82 0-3.23-1.23-3.23-3.23 0-2 1.41-3.23 3.23-3.23.55 0 1.05.09 1.5.27v-5.5c0-.96-.77-1.73-1.73-1.73H6.5c-1.54 0-2.8 1.26-2.8 2.8v10.4c0 1.54 1.26 2.8 2.8 2.8h10.4c1.54 0 2.8-1.26 2.8-2.8v-6.6c0-1.54-1.26-2.8-2.8-2.8z" />
          </svg>
          Apple
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="John Smith"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordStrength(calculatePasswordStrength(e.target.value));
              }}
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {password && (
            <div className="space-y-2 mt-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      passwordStrength.level === 'weak'
                        ? 'w-1/3 bg-red-500'
                        : passwordStrength.level === 'medium'
                          ? 'w-2/3 bg-yellow-500'
                          : 'w-full bg-green-500'
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-medium ${
                    passwordStrength.level === 'weak'
                      ? 'text-red-600'
                      : passwordStrength.level === 'medium'
                        ? 'text-yellow-600'
                        : 'text-green-600'
                  }`}
                >
                  {passwordStrength.level.charAt(0).toUpperCase() + passwordStrength.level.slice(1)}
                </span>
              </div>

              {passwordStrength.feedback.length > 0 && (
                <ul className="text-xs text-gray-600 space-y-1">
                  {passwordStrength.feedback.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <X size={14} className="text-gray-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {passwordStrength.level === 'strong' && (
                <div className="text-xs text-green-600 flex items-center gap-2">
                  <Check size={14} />
                  Strong password
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {confirmPassword && password !== confirmPassword && (
            <div className="text-xs text-red-600 flex items-center gap-2">
              <X size={14} />
              Passwords do not match
            </div>
          )}

          {confirmPassword && password === confirmPassword && (
            <div className="text-xs text-green-600 flex items-center gap-2">
              <Check size={14} />
              Passwords match
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={loading || passwordStrength.level !== 'strong' || password !== confirmPassword}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <div className="text-xs text-center text-gray-500">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </div>
    </div>
  );
};

export default SignupForm;
