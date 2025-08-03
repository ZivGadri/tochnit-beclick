import { Resend } from 'resend';

// Lazy initialization of Resend client to avoid build-time errors
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

// Email service interface
export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  react?: React.ReactElement;
  from?: string;
}

// Send email function
export async function sendEmail(options: EmailOptions) {
  try {
    const resend = getResendClient();
    const fromEmail = options.from || process.env.RESEND_FROM_EMAIL || "רותם אדריכלות <noreply@rotem-architecture.com>";
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
      react: options.react,
    });

    if (error) {
      console.error("Resend email error:", error);
      return { success: false, error: error.message };
    }

    console.log("Email sent successfully:", data?.id);
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error("Error sending email with Resend:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}

// Email verification helper (optional, for checking domain status)
export async function verifyDomain(domain: string) {
  try {
    // This would be used if you need to programmatically verify domains
    // For now, domains are verified through the Resend dashboard
    console.log(`Domain verification should be done through Resend dashboard for: ${domain}`);
    return { success: true };
  } catch (error) {
    console.error("Domain verification error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
