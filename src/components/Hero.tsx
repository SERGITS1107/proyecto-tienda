import React from 'react';
import { ArrowDown, Sparkles, QrCode } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenQrModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenQrModal }) => {
  return (
    <section id="inicio" className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20">
      {/* Elementos decorativos sutiles de fondo en tonos rosa suave */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#FBECEF] via-[#F8DEE5]/60 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -top-12 right-0 w-72 h-72 bg-[#F6DCE3]/40 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Distintivo de Boutique Física */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#F3D7DF] text-[#4A4245] text-xs font-medium mb-6 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#D47A92] animate-pulse" />
          <span className="tracking-wide">Catálogo Digital Oficial en Tienda</span>
          <span className="text-[#A3999D]">•</span>
          <button
            onClick={onOpenQrModal}
            className="inline-flex items-center gap-1 text-[#C05C77] hover:underline font-semibold cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Acceso QR</span>
          </button>
        </div>

        {/* Concepto & Subtítulo Superior */}
        <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#695D62] uppercase mb-3">
          MODA Y ESTILO
        </p>

        {/* Título Principal */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#2D282A] font-semibold tracking-tight leading-[1.15] mb-5">
          Encuentra tu próximo <br className="hidden sm:inline" />
          <span className="font-brand-script text-5xl sm:text-6xl md:text-7xl font-normal text-[#C05C77] -mt-1 inline-block px-1">
            look favorito
          </span>
        </h1>

        {/* Texto Secundario */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#554D51] font-normal leading-relaxed mb-8">
          Descubre nuestras prendas y encuentra el estilo que va contigo. Explora casacas, polos y
          pantalones pensados para acompañarte en cada momento.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base font-medium text-white bg-[#2D282A] hover:bg-[#3D3739] active:scale-[0.99] transition-all shadow-md hover:shadow-lg cursor-pointer group"
          >
            <span>Ver catálogo</span>
            <ArrowDown className="w-4 h-4 text-[#FCECEF] group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onOpenQrModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-[#4A4245] bg-[#FCECEF] hover:bg-[#F6DEE5] border border-[#F4D6DC] transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C05C77]" />
            <span>Escanear QR en percheros</span>
          </button>
        </div>

        {/* Micro-características de consulta en tienda */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-12 pt-8 border-t border-[#F0DCE2]/80 max-w-xl mx-auto text-center">
          <div className="px-2">
            <p className="text-xs sm:text-sm font-semibold text-[#2D282A]">Tallas Reales</p>
            <p className="text-[11px] sm:text-xs text-[#695D62] mt-0.5">S al XL & tallas 28-34</p>
          </div>
          <div className="px-2 border-x border-[#F0DCE2]">
            <p className="text-xs sm:text-sm font-semibold text-[#2D282A]">Stock en Vivo</p>
            <p className="text-[11px] sm:text-xs text-[#695D62] mt-0.5">Disponibilidad en tienda</p>
          </div>
          <div className="px-2">
            <p className="text-xs sm:text-sm font-semibold text-[#2D282A]">Asesoría</p>
            <p className="text-[11px] sm:text-xs text-[#695D62] mt-0.5">Prueba en probadores</p>
          </div>
        </div>
      </div>
    </section>
  );
};
