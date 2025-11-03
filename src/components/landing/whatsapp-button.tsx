'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

type WhatsAppButtonProps = {
    dictionary: any;
}

const WhatsAppButton = ({ dictionary }: WhatsAppButtonProps) => {
  return (
    <Button
      asChild
      size="icon"
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg z-50"
    >
      <Link href="https://wa.me/62811144793" target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-8 w-8 text-white" />
        <span className="sr-only">{dictionary.contactUs}</span>
      </Link>
    </Button>
  );
};

export default WhatsAppButton;
