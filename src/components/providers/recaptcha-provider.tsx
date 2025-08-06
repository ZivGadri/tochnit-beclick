'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ReactNode } from 'react';

interface ReCaptchaProviderProps {
  children: ReactNode;
}

export function ReCaptchaProvider({ children }: ReCaptchaProviderProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // If no site key is provided, render children without reCAPTCHA
  if (!siteKey) {
    console.warn('reCAPTCHA site key not configured, reCAPTCHA v3 will not be available');
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      language="he" // Hebrew language support
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
      container={{
        parameters: {
          badge: 'bottomright', // Position the reCAPTCHA badge
          theme: 'light',
        },
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
