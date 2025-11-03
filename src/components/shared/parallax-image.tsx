'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

type ParallaxImageProps = Omit<ImageProps, 'className' | 'style'> & {
  speed?: number;
};

const ParallaxImage = ({ src, alt, speed = 0.2, ...props }: ParallaxImageProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const yPos = -(offset * speed);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      style={{ transform: `translate3d(0, ${yPos}px, 0)` }}
      {...props}
    />
  );
};

export default ParallaxImage;
