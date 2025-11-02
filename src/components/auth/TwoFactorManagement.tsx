import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Shield, CheckCircle, XCircle, AlertCircle, Trash2 } from 'lucide-react';
import { TwoFactorEnrollDialog } from './TwoFactorEnrollDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const TwoFactorManagement = () => {
  const [mfaFactors, setMfaFactors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [showDisableDialog, setShowDisableDialog] = useState(false);
  const [factorToDisable, setFactorToDisable] = useState<string | null>(null);

  useEffect(() => {
    loadMfaFactors();
  }, []);

  const loadMfaFactors = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.factors) {
        setMfaFactors(user.factors);
      }
    } catch (error: any) {
      toast.error('Failed to load 2FA settings', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollmentComplete = () => {
    loadMfaFactors();
    toast.success('Two-Factor Authentication has been enabled successfully!');
  };

  const confirmDisable2FA = (factorId: string) => {
    setFactorToDisable(factorId);
    setShowDisableDialog(true);
  };

  const handleDisable2FA = async () => {
    if (!factorToDisable) return;

    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId: factorToDisable });

      if (error) throw error;

      toast.success('Two-Factor Authentication has been disabled');
      loadMfaFactors();
      setShowDisableDialog(false);
      setFactorToDisable(null);
    } catch (error: any) {
      toast.error('Failed to disable 2FA', {
        description: error.message,
      });
    }
  };

  const hasVerifiedTotp = mfaFactors.some(
    (factor) => factor.factor_type === 'totp' && factor.status === 'verified'
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium">Authenticator App (TOTP)</h4>
                {hasVerifiedTotp ? (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <XCircle className="h-3 w-3 mr-1" />
                    Disabled
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Use an authenticator app like Google Authenticator or Authy to generate verification codes
              </p>
            </div>
          </div>

          {!hasVerifiedTotp ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Two-factor authentication is currently disabled. Enable it to add an extra layer of security to your account.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Your account is protected with two-factor authentication. You'll be asked for a verification code when signing in.
              </AlertDescription>
            </Alert>
          )}

          {mfaFactors.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Active Factors</h4>
              {mfaFactors.map((factor) => (
                <div key={factor.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium capitalize">
                      {factor.factor_type} - {factor.status}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(factor.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {factor.status === 'verified' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => confirmDisable2FA(factor.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="pt-4">
            {!hasVerifiedTotp ? (
              <Button onClick={() => setShowEnrollDialog(true)} className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Enable Two-Factor Authentication
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setShowEnrollDialog(true)}
                className="w-full"
              >
                <Shield className="h-4 w-4 mr-2" />
                Add Another Factor
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <TwoFactorEnrollDialog
        open={showEnrollDialog}
        onOpenChange={setShowEnrollDialog}
        onEnrollmentComplete={handleEnrollmentComplete}
      />

      <AlertDialog open={showDisableDialog} onOpenChange={setShowDisableDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable Two-Factor Authentication?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove two-factor authentication from your account. Your account will be less secure without 2FA.
              Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDisable2FA} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Disable 2FA
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
