'use client';

import Image, { ImageProps } from 'next/image';

type ParallaxImageProps = Omit<ImageProps, 'className' | 'style'>;

const ParallaxImage = ({ src, alt, priority = false, sizes = "100vw", ...props }: ParallaxImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      priority={priority}
      sizes={sizes}
      {...props}
    />
  );
};

export default ParallaxImage;
