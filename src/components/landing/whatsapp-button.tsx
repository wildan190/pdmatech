'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type WhatsAppButtonProps = {
    dictionary: any;
}

const WhatsAppButton = ({ dictionary }: WhatsAppButtonProps) => {
  return (
    <Button
      asChild
      size="icon"
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg z-50 p-3"
    >
      <Link href="https://wa.me/62811144793" target="_blank" rel="noopener noreferrer">
        <Image
          src="/assets/svg/whatsapp.svg"
          alt={dictionary.contactUs}
          width={40}
          height={40}
          className="invert"
        />
        <span className="sr-only">{dictionary.contactUs}</span>
      </Link>
    </Button>
  );
};

export default WhatsAppButton;
