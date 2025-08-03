import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  Row,
  Column,
  Button,
} from '@react-email/components';
import * as React from 'react';

interface QuoteResponseEmailProps {
  customerName: string;
  quoteAmount: string;
  services: string[];
  notes?: string;
}

export const QuoteResponseEmail = ({
  customerName,
  quoteAmount,
  services,
  notes,
}: QuoteResponseEmailProps) => (
  <Html dir="rtl" lang="he">
    <Head />
    <Preview>הצעת המחיר שלך מרותם אדריכלות ועיצוב - {quoteAmount}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>🎉 הצעת המחיר שלך מוכנה!</Heading>
          <Text style={headerSubtitle}>
            רותם אדריכלות ועיצוב פנים
          </Text>
        </Section>

        <Section style={content}>
          <Text style={greeting}>שלום {customerName},</Text>
          
          <Text style={messageText}>
            תודה רבה על פנייתך לרותם אדריכלות ועיצוב! לאחר בחינת הפרטים שהעברת, 
            אנו שמחים להציג לך את הצעת המחיר המותאמת אישית לפרויקט שלך.
          </Text>

          <Section style={quoteSection}>
            <Heading as="h2" style={sectionTitle}>פרטי ההצעה</Heading>
            
            <Row style={quoteRow}>
              <Column style={quoteLabel}>
                <Text style={quoteLabelText}>סכום כולל:</Text>
              </Column>
              <Column style={quoteValue}>
                <Text style={quoteAmountText}>{quoteAmount}</Text>
              </Column>
            </Row>
          </Section>

          <Section style={servicesSection}>
            <Heading as="h3" style={sectionTitle}>השירותים הכלולים בהצעה:</Heading>
            {services.map((service, index) => (
              <Text key={index} style={serviceItem}>
                ✓ {service}
              </Text>
            ))}
          </Section>

          {notes && (
            <Section style={notesSection}>
              <Heading as="h3" style={sectionTitle}>הערות נוספות:</Heading>
              <Text style={notesText}>{notes}</Text>
            </Section>
          )}

          <Hr style={divider} />

          <Section style={ctaSection}>
            <Text style={ctaText}>
              מעוניין/ת להמשיך עם הפרויקט? נשמח לתאם פגישה לדיון נוסף ותכנון הפרויקט.
            </Text>
            
            <Button style={ctaButton} href="tel:050-123-4567">
              📞 צור קשר לתיאום פגישה
            </Button>
          </Section>

          <Section style={nextStepsSection}>
            <Heading as="h3" style={sectionTitle}>הצעדים הבאים:</Heading>
            <Text style={stepsText}>
              • בחינת ההצעה והפרטים<br />
              • תיאום פגישת ייעוץ מפורטת<br />
              • התאמה אישית של התכנון לצרכים שלך<br />
              • התחלת העבודה על הפרויקט
            </Text>
          </Section>
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
            "הופכים חלומות למציאות אדריכלית"
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

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
  background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
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

const content = {
  padding: '40px 30px',
};

const greeting = {
  color: '#333333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
  textAlign: 'right' as const,
};

const messageText = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 30px 0',
  textAlign: 'right' as const,
};

const sectionTitle = {
  color: '#333333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 15px 0',
  textAlign: 'right' as const,
};

const quoteSection = {
  backgroundColor: '#f8f9fa',
  padding: '25px',
  borderRadius: '8px',
  border: '2px solid #28a745',
  margin: '20px 0',
};

const quoteRow = {
  margin: '0',
};

const quoteLabel = {
  width: '50%',
  verticalAlign: 'middle' as const,
};

const quoteValue = {
  width: '50%',
  verticalAlign: 'middle' as const,
  textAlign: 'left' as const,
};

const quoteLabelText = {
  color: '#333333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
  textAlign: 'right' as const,
};

const quoteAmountText = {
  color: '#28a745',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  textAlign: 'left' as const,
};

const servicesSection = {
  margin: '30px 0',
};

const serviceItem = {
  color: '#333333',
  fontSize: '14px',
  margin: '8px 0',
  textAlign: 'right' as const,
  backgroundColor: '#f8f9fa',
  padding: '8px 12px',
  borderRadius: '4px',
  borderRight: '3px solid #28a745',
};

const notesSection = {
  margin: '30px 0',
};

const notesText = {
  backgroundColor: '#fff3cd',
  padding: '15px',
  borderRadius: '4px',
  borderRight: '4px solid #ffc107',
  color: '#333333',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '10px 0',
  textAlign: 'right' as const,
  whiteSpace: 'pre-wrap' as const,
};

const divider = {
  border: 'none',
  borderTop: '1px solid #e0e0e0',
  margin: '30px 0',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const ctaText = {
  color: '#333333',
  fontSize: '16px',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
};

const ctaButton = {
  backgroundColor: '#28a745',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  margin: '0 auto',
};

const nextStepsSection = {
  margin: '30px 0',
};

const stepsText = {
  backgroundColor: '#e3f2fd',
  padding: '20px',
  borderRadius: '8px',
  borderRight: '4px solid #2196f3',
  color: '#333333',
  fontSize: '14px',
  lineHeight: '1.8',
  margin: '0',
  textAlign: 'right' as const,
};

const contactSection = {
  backgroundColor: '#f8f9fa',
  padding: '30px',
  margin: '20px 0 0 0',
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
