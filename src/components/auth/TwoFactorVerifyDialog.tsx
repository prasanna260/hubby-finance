import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Shield, AlertCircle, Key } from 'lucide-react';

interface TwoFactorVerifyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  factorId: string;
  onVerificationSuccess: () => void;
}

export const TwoFactorVerifyDialog = ({
  open,
  onOpenChange,
  factorId,
  onVerificationSuccess
}: TwoFactorVerifyDialogProps) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'totp' | 'recovery'>('totp');

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
      onVerificationSuccess();
      onOpenChange(false);
      resetDialog();
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

  const resetDialog = () => {
    setVerificationCode('');
    setRecoveryCode('');
    setActiveTab('totp');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'totp') {
      verifyTOTP();
    } else {
      verifyRecoveryCode();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) resetDialog();
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </DialogTitle>
          <DialogDescription>
            Enter your verification code to continue
          </DialogDescription>
        </DialogHeader>

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
                />
                <p className="text-xs text-muted-foreground">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading || verificationCode.length !== 6}
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
                  onClick={() => onOpenChange(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading || recoveryCode.length < 6}
                  className="w-full"
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </Button>
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
