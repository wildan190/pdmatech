'use client';

import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Globe, ShoppingCart, MessageSquare, AppWindow } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const solutions = [
    {
        icon: <Globe className="w-8 h-8 text-primary" />,
        title: "Website & Profil Perusahaan",
        description: "Bangun kehadiran online yang profesional untuk menjangkau lebih banyak pelanggan dan meningkatkan kredibilitas bisnis Anda."
    },
    {
        icon: <ShoppingCart className="w-8 h-8 text-primary" />,
        title: "Point of Sale (POS) Lite",
        description: "Sistem kasir modern yang mudah digunakan untuk mencatat penjualan, mengelola inventaris, dan memantau laporan bisnis secara real-time."
    },
    {
        icon: <MessageSquare className="w-8 h-8 text-primary" />,
        title: "Manajemen Media Sosial",
        description: "Tingkatkan interaksi dengan pelanggan dan perkuat brand Anda melalui strategi konten dan manajemen media sosial yang efektif."
    },
    {
        icon: <AppWindow className="w-8 h-8 text-primary" />,
        title: "Aplikasi Mikro Kustom",
        description: "Butuh solusi digital yang spesifik? Kami dapat membuatkan aplikasi sederhana yang disesuaikan untuk kebutuhan unik bisnis Anda."
    }
];

const advantages = [
  {
    title: "Harga Terjangkau",
    description: "Kami menyediakan solusi berkualitas dengan harga yang dirancang khusus agar sesuai dengan anggaran UMKM."
  },
  {
    title: "Mudah Digunakan",
    description: "Tidak perlu keahlian teknis. Platform kami intuitif dan dirancang untuk kemudahan penggunaan bagi siapa saja."
  },
  {
    title: "Dukungan Penuh",
    description: "Tim kami siap membantu Anda di setiap langkah, memastikan Anda mendapatkan manfaat maksimal dari solusi kami."
  },
  {
    title: "Skalabilitas",
    description: "Solusi kami dapat tumbuh bersama bisnis Anda, siap untuk dikembangkan seiring dengan kesuksesan Anda."
  }
];

export default function UmkmPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'umkm-hero');
  const umkmChallengeImage = PlaceHolderImages.find(p => p.id === 'umkm-challenge');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        
        {/* Breadcrumb */}
        <section className="bg-secondary/50 py-4 border-b">
          <div className="container">
             <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>UMKM Solutions</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-start text-left">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                />
            )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 container text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Solusi Digital untuk UMKM Maju</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl">
              Kami hadir untuk memberdayakan usaha kecil dan menengah dengan teknologi yang tepat guna, terjangkau, dan mudah digunakan.
            </p>
          </div>
        </section>

        {/* The UMKM Challenge */}
        <section className="py-20 lg:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-semibold text-primary">TANTANGAN UMKM</p>
                <h2 className="text-3xl font-bold font-headline mt-2">Menavigasi Era Digital</h2>
                <p className="text-muted-foreground text-lg mt-4 mb-6">
                  Di tengah persaingan yang ketat, UMKM seringkali menghadapi keterbatasan sumber daya untuk mengadopsi teknologi. Mulai dari kesulitan membangun kehadiran online, mengelola operasional secara efisien, hingga menjangkau pasar yang lebih luas. Kami mengerti tantangan ini dan menyediakan jembatan bagi Anda untuk bertransformasi secara digital.
                </p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                {umkmChallengeImage && (
                    <Image
                    src={umkmChallengeImage.imageUrl}
                    alt={umkmChallengeImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={umkmChallengeImage.imageHint}
                    />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Our Solutions for UMKM */}
        <section className="py-20 lg:py-24 bg-secondary/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Solusi Tepat untuk Bisnis Anda</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Kami menawarkan serangkaian layanan yang dirancang khusus untuk mendorong pertumbuhan bisnis UMKM.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {solutions.map((solution) => (
                <Card key={solution.title} className="text-center p-6 border-0 shadow-lg hover:shadow-primary/20 transition-shadow bg-background">
                    <CardContent className="flex flex-col items-center gap-4 p-0">
                      <div className="bg-primary/10 p-4 rounded-full">
                        {solution.icon}
                      </div>
                      <h3 className="font-bold text-xl">{solution.title}</h3>
                      <p className="text-muted-foreground text-sm">{solution.description}</p>
                    </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us for UMKM */}
        <section className="py-20 lg:py-24 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-4">
                  <p className="font-semibold text-primary">MENGAPA KAMI?</p>
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">Partner Pertumbuhan Digital Anda</h2>
                  <p className="text-muted-foreground text-lg">Kami bukan hanya penyedia teknologi, tapi partner yang berkomitmen untuk kesuksesan bisnis Anda. Kami fokus pada solusi yang memberikan dampak nyata.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {advantages.map((item, index) => (
                  <div key={index} className="p-6 rounded-lg bg-secondary/30">
                      <CheckCircle className="w-8 h-8 text-primary mb-4"/>
                      <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">Siap Membawa Bisnis Anda ke Level Berikutnya?</h2>
            <p className="max-w-2xl mx-auto mb-8">Diskusikan kebutuhan bisnis Anda bersama kami dan temukan solusi digital yang paling tepat. Konsultasi gratis!</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/#contact">
                Hubungi Kami Sekarang <ArrowRight className="ml-2"/>
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
