
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import React from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import LanguageSwitcher from './language-switcher';

type HeaderProps = {
    dictionary: any;
    lang: string;
}

const Header = ({ dictionary, lang }: HeaderProps) => {
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const aboutUsComponents = [
    {
      title: dictionary.aboutUsSubMenu.company.title,
      href: `/${lang}/about/company`,
      description: dictionary.aboutUsSubMenu.company.description,
    },
    {
      title: dictionary.aboutUsSubMenu.people.title,
      href: `/${lang}/about/people`,
      description: dictionary.aboutUsSubMenu.people.description,
    },
    {
      title: dictionary.aboutUsSubMenu.privacy.title,
      href: `/${lang}/about/privacy`,
      description: dictionary.aboutUsSubMenu.privacy.description,
    },
  ];

  const ictSolutionsComponents = [
      {
          title: dictionary.ictSolutionsSubMenu.iot.title,
          href: `/${lang}/ict-solutions/iot`,
          description: dictionary.ictSolutionsSubMenu.iot.description,
      },
      {
          title: dictionary.ictSolutionsSubMenu.enterprise.title,
          href: `/${lang}/ict-solutions/enterprise`,
          description: dictionary.ictSolutionsSubMenu.enterprise.description,
      },
      {
          title: dictionary.ictSolutionsSubMenu.umkm.title,
          href: `/${lang}/ict-solutions/umkm`,
          description: dictionary.ictSolutionsSubMenu.umkm.description,
      },
      {
          title: dictionary.ictSolutionsSubMenu.web.title,
          href: `/${lang}/ict-solutions/web`,
          description: dictionary.ictSolutionsSubMenu.web.description,
      },
  ];

  const insightComponents = [
      {
          title: dictionary.insightSubMenu.news.title,
          href: `/${lang}/insight/news`,
          description: dictionary.insightSubMenu.news.description,
      },
      {
          title: dictionary.insightSubMenu.article.title,
          href: `/${lang}/insight/article`,
          description: dictionary.insightSubMenu.article.description,
      },
      {
          title: dictionary.insightSubMenu.brochure.title,
          href: `/${lang}/insight/brochure`,
          description: dictionary.insightSubMenu.brochure.description,
      },
  ];

  const handleLinkClick = () => {
    setSheetOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href={`/${lang}`} className="flex items-start">
          <div>
            <div className="font-bold font-headline text-lg">Micro Padma Nusantara</div>
            <div className="text-sm text-muted-foreground">{dictionary.header.tagline}</div>
          </div>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{dictionary.navigation.aboutUs}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                  {aboutUsComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{dictionary.navigation.ictSolutions}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                  {ictSolutionsComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{dictionary.navigation.insight}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                  {insightComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
             <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href={`/${lang}/contact`}>{dictionary.navigation.contactUs}</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <LanguageSwitcher lang={lang} />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
         <div className="flex items-center gap-4 md:hidden">
             <LanguageSwitcher lang={lang} />
             <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    </SheetHeader>
                    <Link href={`/${lang}`} className="flex items-start" onClick={handleLinkClick}>
                        <div>
                            <div className="font-bold font-headline text-lg">Micro Padma Nusantara</div>
                            <div className="text-sm text-muted-foreground">{dictionary.header.tagline}</div>
                        </div>
                    </Link>
                    <Accordion type="single" collapsible className="w-full mt-6">
                      <AccordionItem value="about-us">
                        <AccordionTrigger className="text-base font-medium">{dictionary.navigation.aboutUs}</AccordionTrigger>
                        <AccordionContent className="pl-4">
                          <div className="grid gap-3">
                            {aboutUsComponents.map(item => <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground" onClick={handleLinkClick}>{item.title}</Link>)}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="ict-solutions">
                        <AccordionTrigger className="text-base font-medium">{dictionary.navigation.ictSolutions}</AccordionTrigger>
                        <AccordionContent className="pl-4">
                          <div className="grid gap-3">
                          {ictSolutionsComponents.map(item => <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground" onClick={handleLinkClick}>{item.title}</Link>)}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="insight">
                        <AccordionTrigger className="text-base font-medium">{dictionary.navigation.insight}</AccordionTrigger>
                        <AccordionContent className="pl-4">
                          <div className="grid gap-3">
                            {insightComponents.map(item => <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground" onClick={handleLinkClick}>{item.title}</Link>)}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Button asChild className="w-full mt-6">
                        <Link href={`/${lang}/contact`} onClick={handleLinkClick}>{dictionary.navigation.contactUs}</Link>
                    </Button>
                </SheetContent>
             </Sheet>
        </div>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={props.href ?? ''}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export default Header;
