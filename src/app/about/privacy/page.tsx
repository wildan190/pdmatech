import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p>Our privacy policy details.</p>
      </main>
      <Footer />
    </div>
  );
}
