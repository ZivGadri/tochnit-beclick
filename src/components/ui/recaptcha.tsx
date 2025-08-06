'use client';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { forwardRef, useImperativeHandle, useCallback } from 'react';

export interface RecaptchaRef {
  executeAsync: (action?: string) => Promise<string | null>;
  reset: () => void;
}

interface RecaptchaProps {
  siteKey?: string; // Optional since provider handles the key
  onError?: () => void;
  action?: string;
}

export const Recaptcha = forwardRef<RecaptchaRef, RecaptchaProps>(
  ({ onError, action = 'submit' }, ref) => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleExecuteRecaptcha = useCallback(async (actionName?: string) => {
      if (!executeRecaptcha) {
        console.error('reCAPTCHA not initialized - make sure GoogleReCaptchaProvider is set up');
        if (onError) onError();
        return null;
      }

      try {
        const token = await executeRecaptcha(actionName || action);
        return token;
      } catch (error) {
        console.error('reCAPTCHA execution error:', error);
        if (onError) onError();
        return null;
      }
    }, [executeRecaptcha, action, onError]);

    useImperativeHandle(ref, () => ({
      executeAsync: handleExecuteRecaptcha,
      reset: () => {
        // reCAPTCHA v3 doesn't need explicit reset as it's invisible
        console.log('reCAPTCHA v3 does not require reset');
      },
    }));

    // reCAPTCHA v3 is invisible, so no visual component is rendered
    return null;
  }
);

Recaptcha.displayName = 'Recaptcha';
