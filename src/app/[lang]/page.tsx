
import Hero from '@/components/landing/hero';
import Experience from '@/components/landing/experience';
import ClimateBanner from '@/components/landing/climate-banner';
import OtherSolutions from '@/components/landing/other-solutions';
import OurTeam from '@/components/landing/our-team';
import Faq from '@/components/landing/faq';
import Contact from '@/components/landing/contact';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import OurClients from '@/components/landing/our-clients';
import BestServices from '@/components/landing/best-services';

export default async function Home({ params }: { params: { lang: Locale }}) {
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  
  return (
      <main className="flex-grow overflow-x-hidden">
        <Hero dictionary={dictionary.homePage.hero} lang={lang} />
        <Experience dictionary={dictionary.homePage.experience} />
        <BestServices dictionary={dictionary.homePage.bestServices} lang={lang} />
        <OurClients dictionary={dictionary.homePage.ourClients} lang={lang} />
        <ClimateBanner dictionary={dictionary.homePage.climateBanner} lang={lang} />
        <OtherSolutions dictionary={dictionary.homePage.services} lang={lang} />
        <OurTeam dictionary={dictionary.homePage.ourTeam} lang={lang} />
        <Faq dictionary={dictionary.homePage.faq} />
        <Contact dictionary={dictionary.homePage.contact} />
      </main>
  );
}
