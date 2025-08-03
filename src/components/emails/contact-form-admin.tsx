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
} from '@react-email/components';
import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const ContactFormAdminEmail = ({
  name,
  email,
  phone,
  message,
}: ContactFormEmailProps) => (
  <Html dir="rtl" lang="he">
    <Head />
    <Preview>הודעת קשר חדשה מ-{name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>💬 הודעת קשר חדשה</Heading>
          <Text style={headerSubtitle}>
            התקבלה הודעה חדשה מטופס הקשר באתר
          </Text>
        </Section>

        <Section style={content}>
          <Row style={fieldRow}>
            <Column style={labelColumn}>
              <Text style={label}>שם מלא:</Text>
            </Column>
            <Column style={valueColumn}>
              <Text style={value}>{name}</Text>
            </Column>
          </Row>

          <Row style={fieldRow}>
            <Column style={labelColumn}>
              <Text style={label}>דואר אלקטרוני:</Text>
            </Column>
            <Column style={valueColumn}>
              <Link href={`mailto:${email}`} style={linkValue}>{email}</Link>
            </Column>
          </Row>

          {phone && (
            <Row style={fieldRow}>
              <Column style={labelColumn}>
                <Text style={label}>טלפון:</Text>
              </Column>
              <Column style={valueColumn}>
                <Link href={`tel:${phone}`} style={linkValue}>{phone}</Link>
              </Column>
            </Row>
          )}

          <Hr style={divider} />

          <Heading as="h2" style={sectionTitle}>הודעה</Heading>
          <Text style={messageStyle}>{message}</Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            <strong>רותם אדריכלות ועיצוב</strong>
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
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: '#ffffff',
  padding: '30px',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
  textAlign: 'center' as const,
};

const headerSubtitle = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0',
  textAlign: 'center' as const,
};

const content = {
  padding: '30px',
};

const sectionTitle = {
  color: '#333333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
  textAlign: 'right' as const,
};

const fieldRow = {
  margin: '12px 0',
};

const labelColumn = {
  width: '30%',
  verticalAlign: 'top' as const,
};

const valueColumn = {
  width: '70%',
  verticalAlign: 'top' as const,
};

const label = {
  fontWeight: 'bold',
  color: '#333333',
  fontSize: '14px',
  margin: '0',
  textAlign: 'right' as const,
};

const value = {
  backgroundColor: '#f8f9fa',
  padding: '8px 12px',
  borderRadius: '4px',
  borderRight: '4px solid #667eea',
  color: '#333333',
  fontSize: '14px',
  margin: '0',
  textAlign: 'right' as const,
};

const linkValue = {
  backgroundColor: '#f8f9fa',
  padding: '8px 12px',
  borderRadius: '4px',
  borderRight: '4px solid #667eea',
  color: '#667eea',
  fontSize: '14px',
  textDecoration: 'none',
  display: 'block',
  textAlign: 'right' as const,
};

const messageStyle = {
  backgroundColor: '#f8f9fa',
  padding: '15px',
  borderRadius: '4px',
  borderRight: '4px solid #667eea',
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
  margin: '20px 0',
};

const footer = {
  backgroundColor: '#f8f9fa',
  padding: '20px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#333333',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
  textAlign: 'center' as const,
};
