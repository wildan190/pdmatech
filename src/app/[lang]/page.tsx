import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Experience from '@/components/landing/experience';
import ClimateBanner from '@/components/landing/climate-banner';
import ServicesAndProduct from '@/components/landing/services-and-product';
import OurTeam from '@/components/landing/our-team';
import Faq from '@/components/landing/faq';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';

export default async function Home({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  
  return (
      <main className="flex-grow">
        <Hero dictionary={dictionary.homePage.hero} lang={lang} />
        <Experience dictionary={dictionary.homePage.experience} />
        <ClimateBanner dictionary={dictionary.homePage.climateBanner} lang={lang} />
        <ServicesAndProduct dictionary={dictionary.homePage.services} lang={lang} />
        <OurTeam dictionary={dictionary.homePage.ourTeam} lang={lang} />
        <Faq dictionary={dictionary.homePage.faq} />
        <Contact dictionary={dictionary.homePage.contact} />
      </main>
  );
}

    