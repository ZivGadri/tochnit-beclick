// Server-side reCAPTCHA v3 verification
export async function verifyRecaptcha(
  token: string, 
  expectedAction?: string,
  minimumScore: number = 0.5
): Promise<{ success: boolean; score?: number; action?: string; error?: string }> {
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
      // reCAPTCHA v3 includes score and action in the response
      const score = data.score || 0;
      const action = data.action || '';
      
      // Check if score meets minimum threshold
      if (score < minimumScore) {
        console.warn(`reCAPTCHA score ${score} below minimum threshold ${minimumScore}`);
        return { 
          success: false, 
          score,
          action,
          error: `Score ${score} below threshold ${minimumScore}` 
        };
      }
      
      // Check if action matches expected action (if provided)
      if (expectedAction && action !== expectedAction) {
        console.warn(`reCAPTCHA action mismatch: expected ${expectedAction}, got ${action}`);
        return { 
          success: false, 
          score,
          action,
          error: `Action mismatch: expected ${expectedAction}, got ${action}` 
        };
      }
      
      return { success: true, score, action };
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
