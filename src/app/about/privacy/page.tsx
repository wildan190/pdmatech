'use client';

import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShieldCheck, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
         <section className="bg-secondary/50 py-4 border-b">
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild><Link href="/about/company">About Us</Link></BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </section>

        <section className="py-20 lg:py-24">
            <div className="container">
                <div className="text-center mb-12">
                    <FileText className="mx-auto h-12 w-12 text-primary mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">Privacy Policy</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Your privacy is important to us. This policy explains what data we collect and how we use it.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                
                <Card className="max-w-4xl mx-auto shadow-lg">
                    <CardHeader>
                        <CardTitle>Our Commitment to Your Privacy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-muted-foreground">
                        <p>
                            PT Micro Padma Nusantara ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy outlines our practices concerning the collection, use, and disclosure of your personal information when you use our website and services (collectively, the "Services"). By accessing or using our Services, you agree to the terms of this Privacy Policy.
                        </p>

                        <h3 className="text-foreground font-semibold">1. Information We Collect</h3>
                        <p>We collect information that you provide directly to us, information we collect automatically, and information from third-party sources.</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Personal Information:</strong> This includes your name, email address, phone number, company name, industry, and any other information you provide when you fill out a contact form, subscribe to our newsletter, or otherwise communicate with us.</li>
                            <li><strong>Usage Data:</strong> We automatically collect information about your interaction with our Services. This may include your IP address, browser type, operating system, pages viewed, links clicked, and the dates and times of your visits.</li>
                            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to collect and track information and to improve and analyze our Service.</li>
                        </ul>

                        <h3 className="text-foreground font-semibold">2. How We Use Your Information</h3>
                        <p>We use the information we collect for various purposes, including to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide, operate, and maintain our Services.</li>
                            <li>Improve, personalize, and expand our Services.</li>
                            <li>Understand and analyze how you use our Services.</li>
                            <li>Communicate with you, either directly or through one of our partners, for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                            <li>Process your transactions and manage your orders.</li>
                            <li>Find and prevent fraud.</li>
                        </ul>

                        <h3 className="text-foreground font-semibold">3. How We Share Your Information</h3>
                        <p>We do not sell your personal information. We may share your information in the following situations:</p>
                         <ul className="list-disc pl-6 space-y-2">
                            <li><strong>With Service Providers:</strong> We may share your information with third-party vendors and service providers that perform services on our behalf, such as hosting, data analysis, and marketing.</li>
                            <li><strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
                            <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company, your Personal Information may be transferred.</li>
                        </ul>

                        <h3 className="text-foreground font-semibold">4. Data Security</h3>
                        <p>
                            The security of your data is important to us. We implement a variety of security measures to maintain the safety of your personal information. However, remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
                        </p>

                        <h3 className="text-foreground font-semibold">5. Your Data Protection Rights</h3>
                        <p>
                            Depending on your location, you may have the following rights regarding your personal information: the right to access, correct, update, or request deletion of your personal information. If you wish to exercise any of these rights, please contact us using the contact information provided below.
                        </p>

                         <h3 className="text-foreground font-semibold">6. Changes to This Privacy Policy</h3>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                        </p>

                         <h3 className="text-foreground font-semibold">7. Contact Us</h3>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <div className="flex items-center gap-4 not-prose">
                            <Mail className="w-5 h-5 text-primary" />
                            <a href="mailto:privacy@micropadmanusantara.example.com" className="text-primary hover:underline">privacy@micropadmanusantara.example.com</a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
