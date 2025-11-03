import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";

export default function BrochurePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Brochure</h1>
        <p>Download our brochure.</p>
      </main>
      <Footer />
    </div>
  );
}
