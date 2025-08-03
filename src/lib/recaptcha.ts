// Server-side reCAPTCHA verification
export async function verifyRecaptcha(token: string): Promise<{ success: boolean; error?: string }> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('reCAPTCHA secret key not configured');
      return { success: false, error: 'reCAPTCHA not configured' };
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (data.success) {
      return { success: true };
    } else {
      console.error('reCAPTCHA verification failed:', data['error-codes']);
      return { 
        success: false, 
        error: `Verification failed: ${data['error-codes']?.join(', ') || 'Unknown error'}` 
      };
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return { success: false, error: 'Verification service error' };
  }
}
