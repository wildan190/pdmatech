import { Metadata } from 'next';
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import { Wrench } from "lucide-react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: 'Company News - On Construction',
  description: 'Our news section is being updated with the latest stories and updates from Micro Padma Nusantara. Please check back soon.',
  robots: {
    index: false,
    follow: true,
  }
};

export default function NewsPage() {
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
                           <BreadcrumbPage>Insight</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>News</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </section>
        <div className="flex-grow container mx-auto px-4 py-20 lg:py-32 flex flex-col items-center justify-center text-center">
            <Wrench className="w-20 h-20 text-primary mb-6" />
            <h1 className="text-4xl font-bold font-headline">On Construction</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-md">
                Our news section is being updated with the latest stories and updates. Please check back soon!
            </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
