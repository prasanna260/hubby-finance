import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Shield, Copy, CheckCircle, AlertCircle, Smartphone } from 'lucide-react';
import QRCode from 'qrcode';

interface TwoFactorEnrollDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnrollmentComplete: () => void;
}

export const TwoFactorEnrollDialog = ({ open, onOpenChange, onEnrollmentComplete }: TwoFactorEnrollDialogProps) => {
  const [step, setStep] = useState<'info' | 'qr' | 'verify' | 'recovery'>('info');
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [factorId, setFactorId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const startEnrollment = async () => {
    setLoading(true);
    try {
      const timestamp = new Date().toISOString().slice(0, 10);
      const randomId = Math.random().toString(36).substring(2, 8);
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: `Authenticator (${timestamp}-${randomId})`,
      });

      if (error) throw error;

      if (data) {
        setFactorId(data.id);
        setSecret(data.totp.secret);

        const { data: user } = await supabase.auth.getUser();
        const email = user?.user?.email || 'user';
        const issuer = 'Family Financial Hub';

        const otpauthUrl = `otpauth://totp/${issuer}:${email}?secret=${data.totp.secret}&issuer=${issuer}`;

        const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl, {
          errorCorrectionLevel: 'M',
          type: 'image/png',
          width: 300,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
        setQrCode(qrCodeDataUrl);

        generateRecoveryCodes();
        setStep('qr');
      }
    } catch (error: any) {
      toast.error('Failed to start enrollment', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const generateRecoveryCodes = () => {
    const codes: string[] = [];
    for (let i = 0; i < 10; i++) {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      codes.push(code);
    }
    setRecoveryCodes(codes);
  };

  const verifyAndComplete = async () => {
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

      toast.success('Two-Factor Authentication enabled successfully!');
      setStep('recovery');
    } catch (error: any) {
      toast.error('Verification failed', {
        description: error.message || 'Invalid code. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    toast.success('Secret key copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const copyRecoveryCodes = () => {
    const codesText = recoveryCodes.join('\n');
    navigator.clipboard.writeText(codesText);
    toast.success('Recovery codes copied to clipboard');
  };

  const handleComplete = () => {
    onEnrollmentComplete();
    onOpenChange(false);
    resetDialog();
  };

  const resetDialog = () => {
    setStep('info');
    setQrCode('');
    setSecret('');
    setFactorId('');
    setVerificationCode('');
    setRecoveryCodes([]);
    setCopied(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) resetDialog();
    }}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Enable Two-Factor Authentication
          </DialogTitle>
          <DialogDescription>
            Add an extra layer of security to your account
          </DialogDescription>
        </DialogHeader>

        {step === 'info' && (
          <div className="space-y-4">
            <Alert>
              <Smartphone className="h-4 w-4" />
              <AlertDescription>
                Two-factor authentication (2FA) adds an extra layer of security to your account by requiring both your password and a verification code from your phone.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <h4 className="font-medium">What you'll need:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>A smartphone or tablet</li>
                <li>An authenticator app (Google Authenticator, Authy, 1Password, etc.)</li>
                <li>A few minutes to complete the setup</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">How it works:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Scan a QR code with your authenticator app</li>
                <li>Enter the verification code from your app</li>
                <li>Save your recovery codes securely</li>
                <li>Use codes from your app each time you log in</li>
              </ol>
            </div>

            <Button onClick={startEnrollment} disabled={loading} className="w-full">
              {loading ? 'Setting up...' : 'Get Started'}
            </Button>
          </div>
        )}

        {step === 'qr' && (
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Scan this QR code with your authenticator app or enter the secret key manually.
              </AlertDescription>
            </Alert>

            <div className="flex flex-col items-center space-y-4">
              {qrCode && (
                <img src={qrCode} alt="QR Code" className="w-48 h-48 border rounded-lg p-2" />
              )}

              <Card className="w-full">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Manual Entry Key</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={secret}
                        readOnly
                        className="font-mono text-xs"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={copySecret}
                        className="flex-shrink-0"
                      >
                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Use this key if you can't scan the QR code
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button onClick={() => setStep('verify')} className="w-full">
              Continue to Verification
            </Button>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Enter the 6-digit code from your authenticator app to verify the setup.
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
              />
              <p className="text-xs text-muted-foreground">
                Enter the 6-digit code displayed in your authenticator app
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('qr')} className="w-full">
                Back
              </Button>
              <Button onClick={verifyAndComplete} disabled={loading || verificationCode.length !== 6} className="w-full">
                {loading ? 'Verifying...' : 'Verify & Enable'}
              </Button>
            </div>
          </div>
        )}

        {step === 'recovery' && (
          <div className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Two-factor authentication has been enabled successfully!
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Save Your Recovery Codes
              </h4>
              <p className="text-sm text-muted-foreground">
                Store these codes in a safe place. You can use them to access your account if you lose your authenticator device.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                  {recoveryCodes.map((code, index) => (
                    <div key={index} className="p-2 bg-muted rounded text-center">
                      {code}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Each recovery code can only be used once. Store them securely offline.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button variant="outline" onClick={copyRecoveryCodes} className="flex-1">
                <Copy className="h-4 w-4 mr-2" />
                Copy Codes
              </Button>
              <Button onClick={handleComplete} className="flex-1">
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
