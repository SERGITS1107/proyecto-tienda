import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  variant = 'dark',
}) => {
  const isLight = variant === 'light';

  // Tamaños adaptables
  const hangerSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
  };

  const titleSizes = {
    sm: 'text-2xl',
    md: 'text-3xl sm:text-4xl',
    lg: 'text-4xl sm:text-5xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[10px] sm:text-[11px] tracking-[0.3em]',
    lg: 'text-xs tracking-[0.35em]',
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {showSubtitle && (
        <span
          className={`font-semibold uppercase text-stone-600 transition-colors ${subtitleSizes[size]} ${
            isLight ? 'text-stone-300' : 'text-[#5C5356]'
          }`}
        >
          MODA Y ESTILO
        </span>
      )}

      <div className="flex items-center gap-2 mt-0.5">
        {/* Ícono de Percha Minimalista */}
        <div
          className={`relative flex items-center justify-center rounded-full bg-[#FCECEF] p-1.5 shadow-xs border border-[#F4D6DC] ${
            hangerSizes[size]
          }`}
          title="Milagritos - Percha de Ropa"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-full h-full ${isLight ? 'text-[#3A3335]' : 'text-[#3A3335]'}`}
          >
            {/* Gancho superior */}
            <path d="M12 4a2.5 2.5 0 0 0-2.5 2.5c0 1.2 1 2 2.5 2.5v1.5" />
            {/* Triángulo inferior de la percha */}
            <path d="M12 10.5L3.5 17.2a1 1 0 0 0 .6 1.8h15.8a1 1 0 0 0 .6-1.8L12 10.5z" />
          </svg>
        </div>

        {/* Nombre Milagritos en tipografía script elegante */}
        <span
          className={`font-brand-script font-normal leading-none tracking-wide text-[#2D282A] ${
            titleSizes[size]
          } ${isLight ? 'text-white' : 'text-[#2D282A]'}`}
          style={{ paddingTop: '2px' }}
        >
          Milagritos
        </span>
      </div>
    </div>
  );
};
