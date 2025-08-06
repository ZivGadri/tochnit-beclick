"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Upload, FileText, X } from "lucide-react";
import { Recaptcha, type RecaptchaRef } from "@/components/ui/recaptcha";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg", 
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const quoteFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "שם פרטי חייב להכיל לפחות 2 תווים"),
  lastName: z.string().min(2, "שם משפחה חייב להכיל לפחות 2 תווים"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().min(9, "מספר טלפון חייב להכיל לפחות 9 ספרות"),
  
  // Project Information
  projectType: z.string().min(1, "יש לבחור סוג פרויקט"),
  projectSize: z.string().min(1, "יש לבחור גודל פרויקט"),
  budget: z.string().min(1, "יש לבחור טווח תקציב"),
  timeline: z.string().min(1, "יש לבחור זמן ביצוע"),
  location: z.string().min(2, "יש להזין מיקום הפרויקט"),
  
  // Services
  services: z.array(z.string()).min(1, "יש לבחור לפחות שירות אחד"),
  
  // Additional Information
  description: z.string().min(10, "תיאור הפרויקט חייב להכיל לפחות 10 תווים"),
  specialRequirements: z.string().optional(),
  
  // Files
  files: z.array(z.any()).optional(),
  
  // Terms
  agreeToTerms: z.boolean().refine((val) => val === true, "יש להסכים לתנאי השימוש"),
  allowMarketing: z.boolean(),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

const serviceOptions = [
  { value: "architectural-design", label: "עיצוב אדריכלי" },
  { value: "interior-design", label: "עיצוב פנים" },
  { value: "space-planning", label: "תכנון חללים" },
  { value: "lighting-design", label: "עיצוב תאורה" },
  { value: "consultation", label: "ייעוץ מקצועי" },
];

export default function QuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const recaptchaRef = useRef<RecaptchaRef>(null);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      projectType: "",
      projectSize: "",
      budget: "",
      timeline: "",
      location: "",
      services: [],
      description: "",
      specialRequirements: "",
      files: [],
      agreeToTerms: false,
      allowMarketing: false,
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`הקובץ ${file.name} גדול מדי. גודל מקסימלי: 10MB`);
        return false;
      }
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        alert(`סוג קובץ לא נתמך: ${file.name}`);
        return false;
      }
      return true;
    });

    setUploadedFiles((prev) => [...prev, ...validFiles]);
    form.setValue("files", [...uploadedFiles, ...validFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    form.setValue("files", newFiles);
  };

  const onSubmit = async (values: QuoteFormValues) => {
    setIsSubmitting(true);
    try {
      // Get reCAPTCHA token if reCAPTCHA is configured
      let recaptchaToken = null;
      if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        recaptchaToken = await recaptchaRef.current?.executeAsync();
        if (!recaptchaToken) {
          alert('אירעה שגיאה באימות האבטחה. אנא נסו שוב.');
          setIsSubmitting(false);
          return;
        }
      } else {
        console.warn('reCAPTCHA is not configured, skipping verification');
      }

      // Prepare file names for email (if any files were uploaded)
      const fileNames = uploadedFiles.map(file => file.name);

      // Send email notification to admin
      const emailResponse = await fetch('/api/email/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${values.firstName} ${values.lastName}`,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          projectType: values.projectType,
          projectSize: values.projectSize,
          budget: values.budget,
          timeline: values.timeline,
          location: values.location,
          services: values.services,
          description: values.description,
          specialRequirements: values.specialRequirements,
          files: fileNames.length > 0 ? fileNames : undefined,
          recaptchaToken: recaptchaToken,
        }),
      });

      const emailResult = await emailResponse.json();

      if (!emailResponse.ok) {
        throw new Error(emailResult.error || 'Failed to send email');
      }

      // TODO: Upload files to AWS S3 if any files were selected
      // TODO: Save quote request to database

      console.log("Quote form submission successful:", values);
      console.log("Email sent:", emailResult);
      
      alert("הבקשה נשלחה בהצלחה! נחזור אליכם בקרוב");
      form.reset();
      setUploadedFiles([]);
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("אירעה שגיאה בשליחת הבקשה. אנא נסו שוב");
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="w-full py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              בקשת הצעת מחיר
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              מלאו את הטופס הבא ונחזור אליכם עם הצעת מחיר מותאמת אישית לפרויקט שלכם
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>פרטי הפרויקט</CardTitle>
              <CardDescription>
                אנא מלאו את כל השדות הנדרשים לקבלת הצעת מחיר מדויקת
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>שם פרטי *</FormLabel>
                          <FormControl>
                            <Input placeholder="הזינו שם פרטי" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>שם משפחה *</FormLabel>
                          <FormControl>
                            <Input placeholder="הזינו שם משפחה" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>כתובת אימייל *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="example@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>מספר טלפון *</FormLabel>
                          <FormControl>
                            <Input placeholder="050-123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Project Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>סוג פרויקט *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="בחרו סוג פרויקט" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="apartment">דירה</SelectItem>
                              <SelectItem value="house">בית פרטי</SelectItem>
                              <SelectItem value="office">משרד</SelectItem>
                              <SelectItem value="commercial">מסחרי</SelectItem>
                              <SelectItem value="public">מבנה ציבורי</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="projectSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>גודל פרויקט *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="בחרו גודל פרויקט" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="small">קטן (עד 100 מ״ר)</SelectItem>
                              <SelectItem value="medium">בינוני (100-200 מ״ר)</SelectItem>
                              <SelectItem value="large">גדול (200-500 מ״ר)</SelectItem>
                              <SelectItem value="xl">גדול מאוד (מעל 500 מ״ר)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>תקציב משוער *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="בחרו טווח תקציב" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">עד 50,000 ₪</SelectItem>
                              <SelectItem value="medium">50,000 - 150,000 ₪</SelectItem>
                              <SelectItem value="high">150,000 - 300,000 ₪</SelectItem>
                              <SelectItem value="premium">מעל 300,000 ₪</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>זמן ביצוע רצוי *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="בחרו זמן ביצוע" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="urgent">דחוף (עד חודש)</SelectItem>
                              <SelectItem value="fast">מהיר (1-3 חודשים)</SelectItem>
                              <SelectItem value="normal">רגיל (3-6 חודשים)</SelectItem>
                              <SelectItem value="flexible">גמיש (מעל 6 חודשים)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>מיקום הפרויקט *</FormLabel>
                        <FormControl>
                          <Input placeholder="עיר, רחוב" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Services */}
                  <FormField
                    control={form.control}
                    name="services"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">שירותים נדרשים *</FormLabel>
                          <FormDescription>
                            בחרו את השירותים שתרצו לכלול בפרויקט
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {serviceOptions.map((item) => (
                            <FormField
                              key={item.value}
                              control={form.control}
                              name="services"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.value}
                                    className="flex flex-row items-start gap-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.value) || false}
                                        onCheckedChange={(checked) => {
                                          const currentServices = field.value || [];
                                          if (checked) {
                                            // Add service if not already included
                                            if (!currentServices.includes(item.value)) {
                                              field.onChange([...currentServices, item.value]);
                                            }
                                          } else {
                                            // Remove service
                                            field.onChange(
                                              currentServices.filter(
                                                (value) => value !== item.value
                                              )
                                            );
                                          }
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel 
                                      className="font-normal cursor-pointer select-none"
                                      onClick={() => {
                                        const currentServices = field.value || [];
                                        const isChecked = currentServices.includes(item.value);
                                        if (!isChecked) {
                                          field.onChange([...currentServices, item.value]);
                                        } else {
                                          field.onChange(
                                            currentServices.filter(
                                              (value) => value !== item.value
                                            )
                                          );
                                        }
                                      }}
                                    >
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>תיאור הפרויקט *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="תארו את החזון שלכם לפרויקט, סגנון רצוי, דרישות מיוחדות וכו'"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>דרישות מיוחדות</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="נגישות, אילוצים טכניים, דרישות תקנוניות וכו'"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* File Upload */}
                  <div className="space-y-4">
                    <FormLabel>קבצים נלווים</FormLabel>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          גררו קבצים לכאן או לחצו לבחירה
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, PDF, DOC עד 10MB
                        </p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept={ACCEPTED_FILE_TYPES.join(",")}
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        aria-label="העלאת קבצים"
                        title="בחרו קבצים להעלאה"
                      />
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">קבצים שהועלו:</p>
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 p-2 rounded"
                          >
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                              <span className="text-xs text-gray-500">
                                ({Math.round(file.size / 1024)} KB)
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start gap-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel 
                              className="cursor-pointer select-none"
                              onClick={() => field.onChange(!field.value)}
                            >
                              אני מסכים לתנאי השימוש ומדיניות הפרטיות *
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="allowMarketing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start gap-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel 
                              className="cursor-pointer select-none"
                              onClick={() => field.onChange(!field.value)}
                            >
                              אני מעוניין לקבל עדכונים ומבצעים בדוא״ל
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* reCAPTCHA */}
                  {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                    <div className="flex justify-center">
                      <Recaptcha
                        ref={recaptchaRef}
                        siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        size="normal"
                        theme="light"
                        onError={() => {
                          console.error('reCAPTCHA failed to load');
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded" role="alert">
                        <span className="block sm:inline">⚠️ reCAPTCHA לא מוגדר. אנא הגדירו את המפתח בהגדרות הסביבה.</span>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "שולח..." : "שלח בקשת הצעת מחיר"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
