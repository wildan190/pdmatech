
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

type FooterProps = {
    dictionary: any;
    lang: string;
}

const Footer = ({ dictionary, lang }: FooterProps) => {
  const companyLinks = [
    { href: `/${lang}/about/company`, label: dictionary.aboutUsSubMenu.company.title },
    { href: `/${lang}/about/people`, label: dictionary.aboutUsSubMenu.people.title },
    { href: `/${lang}/career`, label: dictionary.careerPage.breadcrumb },
    { href: `/${lang}/investor`, label: dictionary.investorPage.breadcrumb },
  ];

  const resourceLinks = [
    { href: `/${lang}/insight/news`, label: dictionary.insightSubMenu.news.title },
    { href: `/${lang}/insight/article`, label: dictionary.insightSubMenu.article.title },
    { href: `/${lang}/insight/brochure`, label: dictionary.insightSubMenu.brochure.title },
    { href: `/${lang}/contact`, label: dictionary.navigation.contactUs },
  ];
  
  return (
    <footer className="border-t bg-card text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link href={`/${lang}`} className="flex items-start justify-center md:justify-start">
              <div>
                <div className="font-bold font-headline text-lg">Micro Padma Nusantara</div>
                <div className="text-sm text-muted-foreground">{dictionary.header.tagline}</div>
              </div>
            </Link>
             <p className="text-sm text-muted-foreground mt-4">
              {dictionary.footer.tagline}
            </p>
            <div className="flex space-x-4 justify-center md:justify-start mt-4">
                <a href="https://facebook.com/micropadmanusantara" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /><span className="sr-only">Facebook</span></a>
                <a href="https://instagram.com/micropadmanusantara" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /><span className="sr-only">Instagram</span></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
             <h3 className="font-semibold mb-4">{dictionary.footer.company}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {companyLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">{dictionary.footer.resources}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {resourceLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link></li>
              ))}
               <li><Link href={`/${lang}/about/privacy`} className=" hover:text-primary transition-colors">{dictionary.aboutUsSubMenu.privacy.title}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">{dictionary.footer.contactUs}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3 justify-center md:justify-start">
                    <MapPin className="h-4 w-4 mt-1 shrink-0 text-primary" />
                    <span>Jl. Profesor Dr. Insinyur Soetami, Kp. Malangnengah, Cijoro Pasir, Rangkasbitung, Lebak, Banten 42316</span>
                </li>
                 <li className="flex items-start gap-3 justify-center md:justify-start">
                    <Mail className="h-4 w-4 mt-1 shrink-0 text-primary" />
                    <a href="mailto:micropadmanusantara@gmail.com" className="hover:text-primary transition-colors">micropadmanusantara@gmail.com</a>
                </li>
                 <li className="flex items-start gap-3 justify-center md:justify-start">
                    <Phone className="h-4 w-4 mt-1 shrink-0 text-primary" />
                    <a href="tel:+62811144793" className="hover:text-primary transition-colors">+62811144793</a>
                </li>
            </ul>
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
