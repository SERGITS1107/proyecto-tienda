import React from 'react';
import { Category } from '../types/product';
import { Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  categoryCounts: Record<string, number>;
  availableSizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  availableSizes,
  selectedSize,
  onSelectSize,
}) => {
  return (
    <div className="w-full">
      {/* Encabezado de la Sección de Catálogo */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C05C77]">
          Nuestra colección
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#2D282A] mt-1.5 mb-2">
          Catálogo
        </h2>
        <p className="text-sm sm:text-base text-[#61575B]">
          Explora nuestras prendas disponibles. Selecciona una categoría y filtra por tu talla.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5">
        {/* 1. Filtro por Categoría */}
        <div className="space-y-2 text-center">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#73686D] block">
            Categoría
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pb-1 px-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.slug.toLowerCase();
              const count = categoryCounts[cat.slug.toLowerCase()] ?? 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.slug)}
                  className={`inline-flex items-center justify-center gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? 'bg-[#2D282A] text-white shadow-sm ring-2 ring-[#2D282A]/20'
                      : 'bg-white hover:bg-[#FCECEF]/60 text-[#4A4245] border border-[#F0DCE2]'
                  }`}
                >
                  <span>{cat.nombre}</span>
                  <span
                    className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-[#FAF5F6]'
                        : 'bg-[#FCECEF] text-[#8C3F54]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Filtro Dinámico por Talla */}
        {availableSizes.length > 0 && (
          <div className="pt-3 border-t border-[#F0DCE2]/70 space-y-2 text-center animate-in fade-in duration-200">
            <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#73686D]">
              <Sparkles className="w-3.5 h-3.5 text-[#C05C77]" />
              <span>Filtrar por talla</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pb-1 px-1">
              {/* Opción "Todas" */}
              <button
                onClick={() => onSelectSize('todas')}
                className={`inline-flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap active:scale-95 ${
                  selectedSize.toLowerCase() === 'todas'
                    ? 'bg-[#C05C77] text-white shadow-xs font-semibold'
                    : 'bg-white hover:bg-[#FCECEF]/50 text-[#554D51] border border-[#ECD1D8]'
                }`}
              >
                Todas
              </button>

              {/* Botones de tallas dinámicas */}
              {availableSizes.map((talla) => {
                const isSelected = selectedSize.toLowerCase() === talla.toLowerCase();
                return (
                  <button
                    key={talla}
                    onClick={() => onSelectSize(isSelected ? 'todas' : talla)}
                    className={`min-w-9 sm:min-w-10 inline-flex items-center justify-center px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'bg-[#C05C77] text-white shadow-xs font-semibold ring-2 ring-[#C05C77]/30'
                        : 'bg-white hover:bg-[#FCECEF]/60 text-[#4A4245] border border-[#ECD1D8]'
                    }`}
                  >
                    {talla}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

