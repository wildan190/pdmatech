
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Frown } from 'lucide-react';
import { headers } from 'next/headers';
import { getDictionary } from '@/lib/dictionaries';
import { i18n } from '@/i18n.config';

export default async function NotFound() {
    const headersList = headers();
    const pathname = headersList.get('x-pathname') || '';
    
    // Extract locale from pathname, default to 'en'
    const locale = i18n.locales.find(l => pathname.startsWith(`/${l}`)) || i18n.defaultLocale;

    const dictionary = await getDictionary(locale);
    const pageDict = dictionary.notFoundPage;

  return (
    <main className="flex-grow flex items-center justify-center bg-background">
      <div className="container text-center">
        <Frown className="mx-auto h-24 w-24 text-primary mb-6 animate-in fade-in zoom-in-50 duration-500" />
        <h1 className="text-6xl md:text-8xl font-bold font-headline text-primary tracking-tighter">
          {pageDict.errorCode}
        </h1>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold font-headline">
          {pageDict.title}
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
          {pageDict.description}
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href={`/${locale}`}>
            <Home className="mr-2" />
            {pageDict.button}
          </Link>
        </Button>
      </div>
    </main>
  );
}
