import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Shield, AlertCircle } from 'lucide-react';

interface TwoFactorPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hasMfaEnabled: boolean;
}

const DISMISS_KEY = 'twoFactorPromptDismissed';

export const TwoFactorPromptDialog = ({
  open,
  onOpenChange,
  hasMfaEnabled,
}: TwoFactorPromptDialogProps) => {
  const navigate = useNavigate();
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISS_KEY) === 'true';
    setIsDismissed(dismissed);
  }, []);

  const handleSecureNow = () => {
    onOpenChange(false);
    navigate('/profile', { state: { tab: 'security' } });
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, 'true');
    setIsDismissed(true);
    onOpenChange(false);
  };

  if (hasMfaEnabled || isDismissed) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <DialogTitle className="text-lg">Secure Your Account</DialogTitle>
          </div>
          <DialogDescription className="text-base mt-4">
            Protect your financial data with Two-Factor Authentication (2FA). This adds an extra layer of security by requiring a verification code when you sign in.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">What is 2FA?</p>
              <p className="text-blue-800 mt-1">
                Two-factor authentication requires a second verification method (usually an authenticator app) in addition to your password.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-green-900">Why enable it?</p>
              <p className="text-green-800 mt-1">
                Protects against unauthorized account access even if your password is compromised.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={handleDismiss}
            className="flex-1"
          >
            Maybe Later
          </Button>
          <Button
            onClick={handleSecureNow}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Shield className="h-4 w-4 mr-2" />
            Secure Account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
