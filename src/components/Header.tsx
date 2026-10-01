import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, QrCode, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenQrModal: () => void;
  onOpenArchitectureModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQrModal,
  onOpenArchitectureModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF5F6]/95 backdrop-blur-md shadow-xs border-b border-[#F0DCE2]'
          : 'bg-[#FAF5F6] border-b border-[#F5E6EB]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo a la izquierda/centro */}
          <div className="flex items-center">
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('inicio');
              }}
              className="group focus:outline-hidden"
              aria-label="Milagritos Moda y Estilo - Ir al inicio"
            >
              <Logo size="md" />
            </a>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-sm font-medium text-[#4A4245] hover:text-[#C05C77] transition-colors py-1 cursor-pointer"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('catalogo')}
              className="text-sm font-medium text-[#4A4245] hover:text-[#C05C77] transition-colors py-1 cursor-pointer"
            >
              Catálogo
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="text-sm font-medium text-[#4A4245] hover:text-[#C05C77] transition-colors py-1 cursor-pointer"
            >
              Contacto
            </button>
          </nav>

          {/* Acciones Rápidas (QR y Preparación Futura) */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenQrModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#4A4245] bg-[#FCECEF] hover:bg-[#F8DDE4] border border-[#F4D6DC] transition-colors shadow-2xs cursor-pointer"
              title="Código QR del catálogo para clientes en tienda"
            >
              <QrCode className="w-3.5 h-3.5 text-[#C05C77]" />
              <span>QR de Tienda</span>
            </button>

            <button
              onClick={onOpenArchitectureModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#4A4245] bg-white hover:bg-stone-50 border border-stone-200 transition-colors shadow-2xs cursor-pointer"
              title="Estructura preparada para Firestore, n8n, Telegram y Gemini"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D47A92]" />
              <span>Arquitectura</span>
            </button>
          </div>

          {/* Botón de Menú Móvil */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenQrModal}
              className="p-2 rounded-lg text-[#4A4245] hover:bg-[#FCECEF] border border-transparent hover:border-[#F4D6DC] transition-colors"
              aria-label="Ver código QR"
            >
              <QrCode className="w-5 h-5 text-[#C05C77]" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#3A3335] hover:bg-[#FCECEF] focus:outline-hidden transition-colors"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF5F6] border-b border-[#F0DCE2] px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-lg">
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-left px-4 py-2.5 rounded-lg text-base font-medium text-[#3A3335] hover:bg-[#FCECEF] hover:text-[#C05C77] transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('catalogo')}
              className="text-left px-4 py-2.5 rounded-lg text-base font-medium text-[#3A3335] hover:bg-[#FCECEF] hover:text-[#C05C77] transition-colors"
            >
              Catálogo de Prendas
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="text-left px-4 py-2.5 rounded-lg text-base font-medium text-[#3A3335] hover:bg-[#FCECEF] hover:text-[#C05C77] transition-colors"
            >
              Contacto y Horarios
            </button>
          </nav>

          <div className="pt-3 border-t border-[#F0DCE2] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQrModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[#3A3335] bg-[#FCECEF] border border-[#F4D6DC]"
            >
              <QrCode className="w-4 h-4 text-[#C05C77]" />
              <span>Ver QR para escanear en tienda</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenArchitectureModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-[#5C5356] bg-white border border-stone-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C05C77]" />
              <span>Ver Arquitectura (Firestore / n8n / Telegram)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
