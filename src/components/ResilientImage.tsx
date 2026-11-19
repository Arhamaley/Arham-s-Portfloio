import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  containerClassName?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  title,
  className = 'h-full w-full object-cover',
  containerClassName = '',
  loading = 'lazy',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#161A22] via-[#111318] to-[#090A0D] p-6 text-center ${containerClassName}`}
      >
        <Layers className="h-7 w-7 text-[#60A5FA]/80" aria-hidden="true" />
        <span className="font-display text-sm font-medium text-[#9CA3AF]">
          {title || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#131519] ${containerClassName}`}>
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#15181E]"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-200 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
