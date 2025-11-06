'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

type CookieConsentProps = {
    dictionary: any;
    lang: string;
};

const CookieConsent = ({ dictionary, lang }: CookieConsentProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only run on the client
        const consent = localStorage.getItem('cookie_consent');
        if (consent !== 'true') {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-12 duration-500">
            <div className="container mx-auto">
                <div className="bg-secondary text-secondary-foreground rounded-lg p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 border">
                    <div className="flex items-start gap-4">
                        <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1 hidden sm:block" />
                        <p className="text-sm" dangerouslySetInnerHTML={{ __html: dictionary.cookieConsent.message.replace('{privacy_policy_link}', `/${lang}/about/privacy`) }}></p>
                    </div>
                    <Button onClick={handleAccept} className="flex-shrink-0 w-full md:w-auto">
                        {dictionary.cookieConsent.accept}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
