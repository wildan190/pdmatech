
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Mail } from "lucide-react";
import { Metadata } from 'next';
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const title = dictionary.aboutUsSubMenu.privacy.title;
  const description = 'Read the Privacy Policy of Micro Padma Nusantara. We are committed to protecting your data and privacy when you use our services.';
  const descriptionId = 'Baca Kebijakan Privasi Micro Padma Nusantara. Kami berkomitmen untuk melindungi data dan privasi Anda saat Anda menggunakan layanan kami.';

  return {
    title,
    description: lang === 'id' ? descriptionId : description,
    keywords: ['privacy policy', 'data protection', 'user privacy', 'terms of service', 'data security'],
    openGraph: {
      title: `${title} - Micro Padma Nusantara`,
      description: lang === 'id' ? descriptionId : description,
      url: `https://mpnsolutions.my.id/${lang}/about/privacy`,
    },
    twitter: {
      title: `${title} - Micro Padma Nusantara`,
      description: lang === 'id' ? descriptionId : description,
    },
    alternates: {
      canonical: `/${lang}/about/privacy`,
      languages: {
        'en': '/en/about/privacy',
        'id': '/id/about/privacy',
        'x-default': '/en/about/privacy',
      },
    },
  };
}

export default async function PrivacyPage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.privacyPage;

  return (
    <main className="flex-grow">
       <section className="bg-secondary/50 py-4 border-b">
          <div className="container">
              <Breadcrumb>
                  <BreadcrumbList>
                      <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                          <Link href={`/${lang}`}>{dictionary.common.home}</Link>
                      </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                          <BreadcrumbLink asChild><Link href={`/${lang}/about/company`}>{dictionary.common.aboutUs}</Link></BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                          <BreadcrumbPage>{pageDict.breadcrumb}</BreadcrumbPage>
                      </BreadcrumbItem>
                  </BreadcrumbList>
              </Breadcrumb>
          </div>
      </section>

      <section className="py-20 lg:py-24">
          <div className="container">
              <div className="text-center mb-12">
                  <FileText className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h1 className="text-4xl md:text-5xl font-bold font-headline">{pageDict.title}</h1>
                  <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                      {pageDict.description}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{pageDict.lastUpdated}: {new Date().toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              
              <Card className="max-w-4xl mx-auto shadow-lg">
                  <CardHeader>
                      <CardTitle>{pageDict.commitment.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 prose prose-lg max-w-none text-muted-foreground">
                      <p>
                          {pageDict.commitment.content}
                      </p>

                      <h3 className="text-foreground font-semibold">{pageDict.infoCollected.title}</h3>
                      <p>{pageDict.infoCollected.content}</p>
                      <ul className="list-disc pl-6 space-y-2">
                          <li dangerouslySetInnerHTML={{ __html: pageDict.infoCollected.item1 }}></li>
                          <li dangerouslySetInnerHTML={{ __html: pageDict.infoCollected.item2 }}></li>
                          <li dangerouslySetInnerHTML={{ __html: pageDict.infoCollected.item3 }}></li>
                      </ul>

                      <h3 className="text-foreground font-semibold">{pageDict.howWeUse.title}</h3>
                      <p>{pageDict.howWeUse.content}</p>
                      <ul className="list-disc pl-6 space-y-2">
                          <li>{pageDict.howWeUse.item1}</li>
                          <li>{pageDict.howWeUse.item2}</li>
                          <li>{pageDict.howWeUse.item3}</li>
                          <li>{pageDict.howWeUse.item4}</li>
                          <li>{pageDict.howWeUse.item5}</li>
                          <li>{pageDict.howWeUse.item6}</li>
                      </ul>

                      <h3 className="text-foreground font-semibold">{pageDict.howWeShare.title}</h3>
                      <p>{pageDict.howWeShare.content}</p>
                       <ul className="list-disc pl-6 space-y-2">
                          <li dangerouslySetInnerHTML={{ __html: pageDict.howWeShare.item1 }}></li>
                          <li dangerouslySetInnerHTML={{ __html: pageDict.howWeShare.item2 }}></li>
                          <li dangerouslySetInnerHTML={{ __html: pageDict.howWeShare.item3 }}></li>
                      </ul>

                      <h3 className="text-foreground font-semibold">{pageDict.dataSecurity.title}</h3>
                      <p>
                          {pageDict.dataSecurity.content}
                      </p>

                      <h3 className="text-foreground font-semibold">{pageDict.yourRights.title}</h3>
                      <p>
                          {pageDict.yourRights.content}
                      </p>

                       <h3 className="text-foreground font-semibold">{pageDict.policyChanges.title}</h3>
                      <p>
                          {pageDict.policyChanges.content}
                      </p>

                       <h3 className="text-foreground font-semibold">{pageDict.contactUs.title}</h3>
                      <p>
                          {pageDict.contactUs.content}
                      </p>
                      <div className="flex items-center gap-4 not-prose">
                          <Mail className="w-5 h-5 text-primary" />
                          <a href="mailto:micropadmanusantara@gmail.com" className="text-primary hover:underline">micropadmanusantara@gmail.com</a>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </section>
    </main>
  );
}
