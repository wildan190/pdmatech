'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '@/i18n.config';

export default function LanguageSwitcher({ lang }: { lang: string }) {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={redirectedPathName('en')}>English</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={redirectedPathName('id')}>Indonesia</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={redirectedPathName('zh')}>中文</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
