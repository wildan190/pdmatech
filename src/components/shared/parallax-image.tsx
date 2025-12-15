'use client';

import Image, { ImageProps } from 'next/image';

type ParallaxImageProps = Omit<ImageProps, 'className' | 'style'>;

const ParallaxImage = ({ src, alt, ...props }: ParallaxImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      {...props}
    />
  );
};

export default ParallaxImage;
