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

interface QuoteRequestEmailProps {
  name: string;
  email: string;
  phone: string;
  services: string[];
  budget: string;
  description: string;
  projectType?: string;
  projectSize?: string;
  timeline?: string;
  location?: string;
  specialRequirements?: string;
  files?: string[];
}

export const QuoteRequestAdminEmail = ({
  name,
  email,
  phone,
  services,
  budget,
  description,
  projectType,
  projectSize,
  timeline,
  location,
  specialRequirements,
  files,
}: QuoteRequestEmailProps) => (
  <Html dir="rtl" lang="he">
    <Head />
    <Preview>בקשת הצעת מחיר חדשה מ-{name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>🏗️ בקשת הצעת מחיר חדשה</Heading>
          <Text style={headerSubtitle}>
            התקבלה בקשה חדשה באתר רותם אדריכלות ועיצוב
          </Text>
        </Section>

        <Section style={content}>
          <Heading as="h2" style={sectionTitle}>פרטי הלקוח</Heading>
          
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

          <Row style={fieldRow}>
            <Column style={labelColumn}>
              <Text style={label}>טלפון:</Text>
            </Column>
            <Column style={valueColumn}>
              <Link href={`tel:${phone}`} style={linkValue}>{phone}</Link>
            </Column>
          </Row>

          <Hr style={divider} />

          <Heading as="h2" style={sectionTitle}>פרטי הפרויקט</Heading>

          {projectType && (
            <Row style={fieldRow}>
              <Column style={labelColumn}>
                <Text style={label}>סוג פרויקט:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{projectType}</Text>
              </Column>
            </Row>
          )}

          {projectSize && (
            <Row style={fieldRow}>
              <Column style={labelColumn}>
                <Text style={label}>גודל פרויקט:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{projectSize}</Text>
              </Column>
            </Row>
          )}

          <Row style={fieldRow}>
            <Column style={labelColumn}>
              <Text style={label}>תקציב משוער:</Text>
            </Column>
            <Column style={valueColumn}>
              <Text style={value}>{budget}</Text>
            </Column>
          </Row>

          {timeline && (
            <Row style={fieldRow}>
              <Column style={labelColumn}>
                <Text style={label}>זמן ביצוע:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{timeline}</Text>
              </Column>
            </Row>
          )}

          {location && (
            <Row style={fieldRow}>
              <Column style={labelColumn}>
                <Text style={label}>מיקום:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{location}</Text>
              </Column>
            </Row>
          )}

          <Hr style={divider} />

          <Heading as="h2" style={sectionTitle}>שירותים מבוקשים</Heading>
          <Section style={servicesContainer}>
            {services.map((service, index) => (
              <Text key={index} style={serviceTag}>{service}</Text>
            ))}
          </Section>

          <Hr style={divider} />

          <Heading as="h2" style={sectionTitle}>תיאור הפרויקט</Heading>
          <Text style={descriptionStyle}>{description}</Text>

          {specialRequirements && (
            <>
              <Heading as="h3" style={subsectionTitle}>דרישות מיוחדות</Heading>
              <Text style={descriptionStyle}>{specialRequirements}</Text>
            </>
          )}

          {files && files.length > 0 && (
            <>
              <Hr style={divider} />
              <Heading as="h2" style={sectionTitle}>קבצים מצורפים</Heading>
              {files.map((file, index) => (
                <Text key={index} style={fileItem}>📎 {file}</Text>
              ))}
            </>
          )}
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            <strong>רותם אדריכלות ועיצוב</strong>
          </Text>
          <Text style={footerSubtext}>
            להגיב ללקוח, התחבר לפאנל הניהול
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

const subsectionTitle = {
  color: '#333333',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '20px 0 10px 0',
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

const servicesContainer = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: '8px',
  marginBottom: '20px',
};

const serviceTag = {
  backgroundColor: '#e3f2fd',
  color: '#1976d2',
  padding: '6px 12px',
  borderRadius: '16px',
  fontSize: '14px',
  display: 'inline-block',
  margin: '4px',
  textAlign: 'center' as const,
};

const descriptionStyle = {
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

const fileItem = {
  backgroundColor: '#f8f9fa',
  padding: '8px 12px',
  borderRadius: '4px',
  borderRight: '4px solid #667eea',
  color: '#333333',
  fontSize: '14px',
  margin: '4px 0',
  textAlign: 'right' as const,
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
  margin: '0 0 5px 0',
  textAlign: 'center' as const,
};

const footerSubtext = {
  color: '#666666',
  fontSize: '14px',
  margin: '0',
  textAlign: 'center' as const,
};
