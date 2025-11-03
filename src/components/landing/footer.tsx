import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

type FooterProps = {
    dictionary: any;
    lang: string;
}

const Footer = ({ dictionary, lang }: FooterProps) => {
  return (
    <footer className="border-t bg-card text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href={`/${lang}`} className="flex items-start">
              <div>
                <div className="font-bold font-headline text-lg">Micro Padma Nusantara</div>
                <div className="text-sm text-muted-foreground">{dictionary.header.tagline}</div>
              </div>
            </Link>
             <p className="text-sm text-muted-foreground mt-4">
              {dictionary.footer.tagline}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{dictionary.footer.contactUs}</h3>
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
            <h3 className="font-semibold mb-4">{dictionary.footer.quickLinks}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href={`/${lang}/about/company`} className=" hover:text-primary transition-colors">{dictionary.navigation.aboutUs}</Link></li>
              <li><Link href={`/${lang}/#services`} className=" hover:text-primary transition-colors">{dictionary.homePage.services.title}</Link></li>
              <li><Link href={`/${lang}/career`} className=" hover:text-primary transition-colors">{dictionary.careerPage.breadcrumb}</Link></li>
              <li><Link href={`/${lang}/insight/news`} className=" hover:text-primary transition-colors">{dictionary.navigation.insight}</Link></li>
              <li><Link href={`/${lang}/#contact`} className=" hover:text-primary transition-colors">{dictionary.navigation.contactUs}</Link></li>
              <li><Link href={`/${lang}/about/privacy`} className=" hover:text-primary transition-colors">{dictionary.aboutUsSubMenu.privacy.title}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{dictionary.footer.followUs}</h3>
             <div className="flex space-x-4">
                <a href="https://facebook.com/micropadmanusantara" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /><span className="sr-only">Facebook</span></a>
                <a href="https://instagram.com/micropadmanusantara" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /><span className="sr-only">Instagram</span></a>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Micro Padma Nusantara. {dictionary.footer.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
