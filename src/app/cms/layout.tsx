'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Newspaper, LogOut, Globe, Mail, FileText, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/cms/login') return <>{children}</>;

  const handleLogout = () => {
    document.cookie = "mpn_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push('/cms/login');
  };

  const navItems = [
    { name: 'News Management', href: '/cms/news', icon: <Newspaper className="w-4 h-4" /> },
    { name: 'Article Management', href: '/cms/articles', icon: <FileText className="w-4 h-4" /> },
    { name: 'Page Management', href: '/cms/pages', icon: <Layout className="w-4 h-4" /> },
    { name: 'Inquiries / Leads', href: '/cms/inquiries', icon: <Mail className="w-4 h-4" /> },
  ];

  const currentNavItem = navItems.find(i => pathname.startsWith(i.href));

  return (
    <div className="min-h-screen bg-background flex">
      {/* Jodit CSS from CDN to avoid build resolution issues */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jodit/4.2.47/jodit.min.css" />
      
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col hidden md:flex">
        <div className="p-6 border-b">
          <h1 className="font-headline font-bold text-xl text-primary">MPN CMS</h1>
          <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname.startsWith(item.href) ? 'default' : 'ghost'}
              className={cn("w-full justify-start gap-3", pathname.startsWith(item.href) ? "bg-primary text-primary-foreground" : "")}
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="p-4 border-t space-y-2">
          <Button variant="outline" className="w-full justify-start gap-3" asChild>
            <Link href="/en">
              <Globe className="w-4 h-4" />
              View Public Site
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b bg-background flex items-center justify-between px-8 shrink-0">
           <div className="flex items-center gap-4">
              <h1 className="font-headline font-bold text-xl text-primary md:hidden">MPN CMS</h1>
              <span className="text-sm font-medium text-muted-foreground hidden md:inline-block">
                {currentNavItem?.name || 'Dashboard'}
              </span>
           </div>
           <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={handleLogout}><LogOut className="w-5 h-5"/></Button>
           </div>
        </header>
        <div className="p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
