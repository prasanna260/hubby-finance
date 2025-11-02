import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Shield, AlertCircle, Key, Clock } from 'lucide-react';

const TwoFactorVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationCode, setVerificationCode] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'totp' | 'recovery'>('totp');
  const [timeLeft, setTimeLeft] = useState(300);
  const [sessionExpired, setSessionExpired] = useState(false);

  const factorId = location.state?.factorId;

  useEffect(() => {
    if (!factorId) {
      navigate('/login');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setSessionExpired(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [factorId, navigate]);

  useEffect(() => {
    if (sessionExpired) {
      const timeout = setTimeout(() => {
        toast.error('2FA session expired', {
          description: 'Please log in again.',
        });
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [sessionExpired, navigate]);

  const verifyTOTP = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const challenge = await supabase.auth.mfa.challenge({ factorId });
      if (challenge.error) throw challenge.error;

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code: verificationCode,
      });

      if (verify.error) throw verify.error;

      toast.success('Verification successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('Verification failed', {
        description: error.message || 'Invalid code. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyRecoveryCode = async () => {
    if (!recoveryCode || recoveryCode.length < 6) {
      toast.error('Please enter a valid recovery code');
      return;
    }

    setLoading(true);
    try {
      toast.info('Recovery code verification', {
        description: 'This feature requires backend implementation',
      });
    } catch (error: any) {
      toast.error('Recovery code verification failed', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionExpired) return;
    if (activeTab === 'totp') {
      verifyTOTP();
    } else {
      verifyRecoveryCode();
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isTimeRunningOut = timeLeft < 60;

  if (sessionExpired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-red-200">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-red-600">
                Session Expired
              </CardTitle>
              <CardDescription className="text-center">
                Your 2FA verification session has expired
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please log in again to continue.
                </AlertDescription>
              </Alert>
              <Button
                onClick={() => navigate('/login')}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Return to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-md"></div>
                <div className="relative bg-blue-600 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Two-Factor Authentication
            </CardTitle>
            <CardDescription className="text-center">
              Step 2 of 2: Verify your identity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div
                className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
                  isTimeRunningOut
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-blue-50 border border-blue-200'
                }`}
              >
                <Clock
                  className={`h-5 w-5 ${
                    isTimeRunningOut ? 'text-red-600' : 'text-blue-600'
                  }`}
                />
                <span
                  className={`font-mono font-semibold ${
                    isTimeRunningOut ? 'text-red-600' : 'text-blue-600'
                  }`}
                >
                  {minutes}:{seconds.toString().padStart(2, '0')}
                </span>
                <span
                  className={`text-sm ${
                    isTimeRunningOut ? 'text-red-600' : 'text-blue-600'
                  }`}
                >
                  Time remaining
                </span>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'totp' | 'recovery')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="totp">
                  <Shield className="h-4 w-4 mr-2" />
                  Authenticator
                </TabsTrigger>
                <TabsTrigger value="recovery">
                  <Key className="h-4 w-4 mr-2" />
                  Recovery Code
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit}>
                <TabsContent value="totp" className="space-y-4 mt-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Open your authenticator app and enter the 6-digit code.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="verificationCode">Verification Code</Label>
                    <Input
                      id="verificationCode"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      placeholder="000000"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                      className="text-center text-2xl tracking-widest font-mono"
                      autoFocus
                      disabled={sessionExpired || loading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the 6-digit code from your authenticator app
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/login')}
                      className="w-full"
                      disabled={loading}
                    >
                      Back to Login
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || verificationCode.length !== 6 || sessionExpired}
                      className="w-full"
                    >
                      {loading ? 'Verifying...' : 'Verify'}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="recovery" className="space-y-4 mt-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Lost access to your authenticator? Use one of your recovery codes.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="recoveryCode">Recovery Code</Label>
                    <Input
                      id="recoveryCode"
                      type="text"
                      placeholder="XXXXXXXX"
                      value={recoveryCode}
                      onChange={(e) => setRecoveryCode(e.target.value.toUpperCase())}
                      className="text-center text-xl tracking-wider font-mono"
                      autoFocus
                      disabled={sessionExpired || loading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter one of your backup recovery codes
                    </p>
                  </div>

                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> Each recovery code can only be used once.
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/login')}
                      className="w-full"
                      disabled={loading}
                    >
                      Back to Login
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || recoveryCode.length < 6 || sessionExpired}
                      className="w-full"
                    >
                      {loading ? 'Verifying...' : 'Verify'}
                    </Button>
                  </div>
                </TabsContent>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TwoFactorVerify;
