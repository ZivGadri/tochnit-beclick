import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Configure AWS SES client
const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Email template types
export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Send email function
export async function sendEmail({ to, subject, html, text }: EmailTemplate) {
  const fromEmail = process.env.AWS_SES_FROM_EMAIL || "noreply@rotem-architecture.com";
  
  const params = {
    Source: fromEmail,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: html,
          Charset: "UTF-8",
        },
        ...(text && {
          Text: {
            Data: text,
            Charset: "UTF-8",
          },
        }),
      },
    },
  };

  try {
    const result = await sesClient.send(new SendEmailCommand(params));
    console.log("Email sent successfully:", result.MessageId);
    return { success: true, messageId: result.MessageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Email templates in Hebrew
export const emailTemplates = {
  // Quote request notification to admin
  quoteRequestAdmin: (data: {
    name: string;
    email: string;
    phone: string;
    services: string[];
    budget: string;
    description: string;
    files?: string[];
  }) => ({
    subject: `בקשת הצעת מחיר חדשה מ-${data.name}`,
    html: `
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>בקשת הצעת מחיר חדשה</title>
        <style>
          body { font-family: Arial, sans-serif; direction: rtl; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #333; margin-bottom: 5px; display: block; }
          .value { background: #f8f9fa; padding: 12px; border-radius: 4px; border-right: 4px solid #667eea; }
          .services { display: flex; flex-wrap: wrap; gap: 8px; }
          .service-tag { background: #e3f2fd; color: #1976d2; padding: 6px 12px; border-radius: 16px; font-size: 14px; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏗️ בקשת הצעת מחיר חדשה</h1>
            <p>התקבלה בקשה חדשה באתר רותם אדריכלות ועיצוב</p>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="label">שם מלא:</span>
              <div class="value">${data.name}</div>
            </div>
            
            <div class="field">
              <span class="label">דואר אלקטרוני:</span>
              <div class="value">${data.email}</div>
            </div>
            
            <div class="field">
              <span class="label">טלפון:</span>
              <div class="value">${data.phone}</div>
            </div>
            
            <div class="field">
              <span class="label">שירותים מבוקשים:</span>
              <div class="value">
                <div class="services">
                  ${data.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
                </div>
              </div>
            </div>
            
            <div class="field">
              <span class="label">תקציב משוער:</span>
              <div class="value">${data.budget}</div>
            </div>
            
            <div class="field">
              <span class="label">תיאור הפרויקט:</span>
              <div class="value">${data.description.replace(/\n/g, '<br>')}</div>
            </div>
            
            ${data.files && data.files.length > 0 ? `
            <div class="field">
              <span class="label">קבצים מצורפים:</span>
              <div class="value">
                ${data.files.map(file => `<div>📎 ${file}</div>`).join('')}
              </div>
            </div>
            ` : ''}
          </div>
          
          <div class="footer">
            <p><strong>רותם אדריכלות ועיצוב</strong></p>
            <p>להגיב ללקוח, התחבר לפאנל הניהול</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `בקשת הצעת מחיר חדשה מ-${data.name}

שם: ${data.name}
אימייל: ${data.email}
טלפון: ${data.phone}
שירותים: ${data.services.join(', ')}
תקציב: ${data.budget}
תיאור: ${data.description}
${data.files && data.files.length > 0 ? `קבצים: ${data.files.join(', ')}` : ''}

רותם אדריכלות ועיצוב`
  }),

  // Quote response to customer
  quoteResponse: (data: {
    customerName: string;
    quoteAmount: string;
    services: string[];
    notes?: string;
  }) => ({
    subject: `הצעת מחיר מרותם אדריכלות ועיצוב`,
    html: `
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>הצעת מחיר</title>
        <style>
          body { font-family: Arial, sans-serif; direction: rtl; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .price { font-size: 32px; font-weight: bold; color: #667eea; text-align: center; margin: 20px 0; }
          .services { list-style: none; padding: 0; }
          .services li { background: #f8f9fa; margin: 8px 0; padding: 12px; border-radius: 4px; border-right: 4px solid #667eea; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; }
          .cta { background: #667eea; color: white; padding: 15px 30px; border-radius: 4px; text-decoration: none; display: inline-block; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏗️ הצעת מחיר</h1>
            <p>שלום ${data.customerName},</p>
            <p>להלן הצעת המחיר עבור הפרויקט שלך</p>
          </div>
          
          <div class="content">
            <div class="price">₪${data.quoteAmount}</div>
            
            <h3>שירותים כלולים:</h3>
            <ul class="services">
              ${data.services.map(service => `<li>${service}</li>`).join('')}
            </ul>
            
            ${data.notes ? `
            <h3>הערות נוספות:</h3>
            <p>${data.notes.replace(/\n/g, '<br>')}</p>
            ` : ''}
            
            <div style="text-align: center;">
              <a href="mailto:admin@rotem-architecture.com" class="cta">
                אשמח לדבר איתך
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>רותם אדריכלות ועיצוב</strong></p>
            <p>טלפון: 054-123-4567 | אימייל: admin@rotem-architecture.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // Contact form notification
  contactFormAdmin: (data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }) => ({
    subject: `הודעת קשר חדשה מ-${data.name}`,
    html: `
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>הודעת קשר חדשה</title>
        <style>
          body { font-family: Arial, sans-serif; direction: rtl; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #333; margin-bottom: 5px; display: block; }
          .value { background: #f8f9fa; padding: 12px; border-radius: 4px; border-right: 4px solid #667eea; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💬 הודעת קשר חדשה</h1>
            <p>התקבלה הודעה חדשה מטופס הקשר באתר</p>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="label">שם מלא:</span>
              <div class="value">${data.name}</div>
            </div>
            
            <div class="field">
              <span class="label">דואר אלקטרוני:</span>
              <div class="value">${data.email}</div>
            </div>
            
            ${data.phone ? `
            <div class="field">
              <span class="label">טלפון:</span>
              <div class="value">${data.phone}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <span class="label">הודעה:</span>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>רותם אדריכלות ועיצוב</strong></p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // Order confirmation email
  orderConfirmation: (data: {
    customerName: string;
    orderId: string;
    services: string[];
    totalAmount: string;
  }) => ({
    subject: `אישור הזמנה #${data.orderId} - רותם אדריכלות ועיצוב`,
    html: `
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>אישור הזמנה</title>
        <style>
          body { font-family: Arial, sans-serif; direction: rtl; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #4caf50 0%, #45a049 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .order-id { font-size: 24px; font-weight: bold; color: #4caf50; text-align: center; margin: 20px 0; }
          .services { list-style: none; padding: 0; }
          .services li { background: #f8f9fa; margin: 8px 0; padding: 12px; border-radius: 4px; border-right: 4px solid #4caf50; }
          .total { font-size: 28px; font-weight: bold; color: #4caf50; text-align: center; margin: 20px 0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ הזמנה אושרה!</h1>
            <p>שלום ${data.customerName},</p>
            <p>תודה על בחירתך ברותם אדריכלות ועיצוב</p>
          </div>
          
          <div class="content">
            <div class="order-id">הזמנה מספר: #${data.orderId}</div>
            
            <h3>שירותים שהוזמנו:</h3>
            <ul class="services">
              ${data.services.map(service => `<li>${service}</li>`).join('')}
            </ul>
            
            <div class="total">סה"כ: ₪${data.totalAmount}</div>
            
            <p>נצור איתך קשר בקרוב להתחלת העבודה על הפרויקט.</p>
          </div>
          
          <div class="footer">
            <p><strong>רותם אדריכלות ועיצוב</strong></p>
            <p>טלפון: 054-123-4567 | אימייל: admin@rotem-architecture.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};
