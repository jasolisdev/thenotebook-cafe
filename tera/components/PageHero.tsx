import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  height?: 'small' | 'medium' | 'large';
}

export const PageHero: React.FC<PageHeroProps> = ({ 
  title, 
  subtitle, 
  image,
  height = 'medium' 
}) => {
  const heightClass = {
    small: 'min-h-[50vh]',
    medium: 'min-h-[70vh]',
    large: 'min-h-[90vh]'
  };

  return (
    <div className={`relative w-full ${heightClass[height]} flex flex-col justify-end pb-20 px-6 md:px-12 overflow-hidden bg-terra-100`}>
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover animate-fade-in-up scale-110" 
          style={{ animationDuration: '1.5s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h1 className="font-serif text-6xl md:text-9xl text-white leading-[0.85] tracking-tight mix-blend-overlay opacity-90">
          {title}
        </h1>
        {subtitle && (
          <div className="mt-8 md:ml-2 max-w-lg">
            <div className="h-px w-12 bg-white/60 mb-6"></div>
            <p className="font-sans text-lg md:text-xl text-white/90 font-light leading-relaxed">
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};