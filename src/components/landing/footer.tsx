import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t bg-card text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-start">
              <div>
                <div className="font-bold font-headline text-lg">Micro Padma Nusantara</div>
                <div className="text-sm text-muted-foreground">Your Business Partner</div>
              </div>
            </Link>
             <p className="text-sm text-muted-foreground mt-4">
              Pioneering future-ready ICT & IoT solutions to empower businesses in the digital era.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-1 shrink-0 text-primary" />
                    <span>Jl. Profesor Dr. Insinyur Soetami, Kp. Malangnengah, Cijoro Pasir, Rangkasbitung, Lebak, Banten 42316</span>
                </li>
                 <li className="flex items-start gap-3">
                    <Mail className="h-4 w-4 mt-1 shrink-0 text-primary" />
                    <a href="mailto:micropadmanusantara@gmail.com" className="hover:text-primary transition-colors">micropadmanusantara@gmail.com</a>
                </li>
                 <li className="flex items-start gap-3">
                    <Phone className="h-4 w-4 mt-1 shrink-0 text-primary" />
                    <a href="tel:+62811144793" className="hover:text-primary transition-colors">+62811144793</a>
                </li>
            </ul>
          </div>
           <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about/company" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/insight/news" className="text-muted-foreground hover:text-primary transition-colors">Insight</Link></li>
              <li><Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/about/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
             <div className="flex space-x-4">
                <a href="https://facebook.com/micropadmanusantara" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /><span className="sr-only">Facebook</span></a>
                <a href="https://instagram.com/micropadmanusantara" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /><span className="sr-only">Instagram</span></a>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Micro Padma Nusantara. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
