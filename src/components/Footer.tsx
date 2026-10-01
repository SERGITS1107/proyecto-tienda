import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2D282A] text-stone-300 pt-12 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-5">
          {/* Logo en versión contrastada */}
          <div className="bg-[#3A3335] p-3 rounded-2xl border border-stone-700/60 shadow-inner">
            <Logo size="lg" showSubtitle={true} variant="light" />
          </div>

          {/* Breve descripción de marca */}
          <p className="max-w-md text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
            Prendas seleccionadas con amor y dedicación. Un catálogo pensado para ofrecerte comodidad,
            versatilidad y tendencia en cada diseño.
          </p>

          {/* Enlaces de Navegación Rápida y Redes */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300">
            <a href="#inicio" className="hover:text-white transition-colors">
              Inicio
            </a>
            <a href="#catalogo" className="hover:text-white transition-colors">
              Catálogo
            </a>
            <a href="#contacto" className="hover:text-white transition-colors">
              Contacto
            </a>
            <a
              href="https://wa.me/51954792571"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors text-emerald-300 font-medium"
            >
              WhatsApp: 954 792 571
            </a>
          </div>

          <p className="text-[11px] text-stone-400">
            Andrés Avelino Cáceres, Galerías La Cachina, Galería 23 • Lun a Dom: 8:00 am - 5:30 pm
          </p>

          {/* Línea divisoria */}
          <div className="w-full max-w-xs border-t border-stone-800 my-2" />

          {/* Copyright Requerido */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-stone-500 font-normal">
            <span>© 2026 Milagritos.</span>
            <span className="hidden sm:inline">•</span>
            <span>Todos los derechos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
