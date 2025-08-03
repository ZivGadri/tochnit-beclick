'use client';

import ReCAPTCHA from 'react-google-recaptcha';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface RecaptchaRef {
  executeAsync: () => Promise<string | null>;
  reset: () => void;
}

interface RecaptchaProps {
  siteKey: string;
  onChange?: (token: string | null) => void;
  onExpired?: () => void;
  onError?: () => void;
  size?: 'compact' | 'normal' | 'invisible';
  theme?: 'light' | 'dark';
  tabindex?: number;
}

export const Recaptcha = forwardRef<RecaptchaRef, RecaptchaProps>(
  ({ siteKey, onChange, onExpired, onError, size = 'normal', theme = 'light', tabindex }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    useImperativeHandle(ref, () => ({
      executeAsync: async () => {
        if (recaptchaRef.current) {
          return await recaptchaRef.current.executeAsync();
        }
        return null;
      },
      reset: () => {
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      },
    }));

    return (
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={onChange}
        onExpired={onExpired}
        onError={onError}
        size={size}
        theme={theme}
        tabindex={tabindex}
      />
    );
  }
);

Recaptcha.displayName = 'Recaptcha';
