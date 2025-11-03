'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const WhatsAppIcon = () => (
    <svg 
      role="img" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white fill-current"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52s-.67-.165-.917-2.207c-.247-.542-.495-.463-.67.0-1.77.462-1.045 2.468-1.045 2.468s3.203 4.948 7.814 6.805c.866.32 1.56.52 2.008.63.757.165 1.5.129 2.067.075.611-.06 1.758-.722 2.006-1.413.248-.691.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.448 0 .05 5.402.053 12.004c0 2.136.566 4.143 1.638 5.867L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.606 0 12.002-5.395 12.002-12.003.001-3.226-1.24-6.25-3.48-8.488z"/>
    </svg>
);

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
        <WhatsAppIcon />
        <span className="sr-only">{dictionary.contactUs}</span>
      </Link>
    </Button>
  );
};

export default WhatsAppButton;
