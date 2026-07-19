import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface OrderConfirmationEmailProps {
  name: string;
  orderNumber: string;
  services: string[];
  totalAmount: number;
  currency: string;
}

export const OrderConfirmationEmail = ({
  name,
  orderNumber,
  services,
  totalAmount,
  currency,
}: OrderConfirmationEmailProps) => {
  const formattedAmount = `${totalAmount.toLocaleString()} ${currency === 'ILS' ? '₪' : currency}`;
  const servicesList = services.length > 0 ? services.join(', ') : 'שירותי אדריכלות ועיצוב פנים';

  return (
    <Html dir="rtl" lang="he">
      <Head />
      <Preview>התשלום עבור הזמנה {orderNumber} התקבל בהצלחה</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>✅ התשלום בוצע בהצלחה</Heading>
            <Text style={headerSubtitle}>
              רותם אדריכלות ועיצוב פנים
            </Text>
          </Section>

          <Section style={contentSection}>
            <Text style={messageText}>
              {`שלום ${name},\n\nתודה שבחרת בשירותי האדריכלות שלנו! קיבלנו את התשלום עבור ההזמנה שלך ואנו כבר מתחילים לטפל בה.`}
            </Text>

            <Hr style={divider} />

            <Heading as="h2" style={sectionTitle}>פרטי ההזמנה</Heading>
            <Text style={stepsText}>
              {`מספר הזמנה: ${orderNumber}\nשירותים: ${servicesList}\nסכום ששולם: ${formattedAmount}`}
            </Text>

            <Hr style={divider} />

            <Heading as="h2" style={sectionTitle}>מה קורה עכשיו?</Heading>
            <Text style={stepsText}>
              {'הצעדים הבאים:\n• נחזור אליך תוך 24 שעות לתיאום פגישת ייעוץ ותכנון\n• נתחיל לעבוד על הפרויקט שלך מיד לאחר הפגישה הראשונה'}
            </Text>
          </Section>

          <Section style={contactSection}>
            <Heading as="h3" style={contactTitle}>פרטי התקשרות</Heading>
            <Text style={contactText}>
              📞 <strong>טלפון:</strong> 050-123-4567<br />
              📧 <strong>אימייל:</strong> info@rotem-architecture.co.il<br />
              🌐 <strong>אתר:</strong> www.rotem-architecture.co.il
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              <strong>רותם אדריכלות ועיצוב פנים</strong><br />
              &quot;הופכים חלומות למציאות אדריכלית&quot;
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: 'Arial, sans-serif',
  direction: 'rtl' as const,
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
};

const header = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: '#ffffff',
  padding: '40px 30px',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
  textAlign: 'center' as const,
  lineHeight: '1.2',
};

const headerSubtitle = {
  color: '#ffffff',
  fontSize: '18px',
  margin: '0',
  textAlign: 'center' as const,
  opacity: 0.9,
};

const contentSection = {
  padding: '40px 30px',
};

const messageText = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 20px 0',
  textAlign: 'right' as const,
  whiteSpace: 'pre-line' as const,
};

const sectionTitle = {
  color: '#333333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 15px 0',
  textAlign: 'right' as const,
};

const stepsText = {
  backgroundColor: '#f8f9fa',
  padding: '20px',
  borderRadius: '8px',
  borderRight: '4px solid #667eea',
  color: '#333333',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0',
  textAlign: 'right' as const,
  whiteSpace: 'pre-line' as const,
};

const divider = {
  border: 'none',
  borderTop: '1px solid #e0e0e0',
  margin: '30px 0',
};

const contactSection = {
  backgroundColor: '#f8f9fa',
  padding: '30px',
  margin: '0',
};

const contactTitle = {
  color: '#333333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 15px 0',
  textAlign: 'right' as const,
};

const contactText = {
  color: '#333333',
  fontSize: '14px',
  lineHeight: '1.8',
  margin: '0',
  textAlign: 'right' as const,
};

const footer = {
  backgroundColor: '#333333',
  color: '#ffffff',
  padding: '30px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0',
  textAlign: 'center' as const,
  lineHeight: '1.4',
};
