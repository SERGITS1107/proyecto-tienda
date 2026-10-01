import React from 'react';
import { Search, X, Check } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onlyInStock: boolean;
  onToggleOnlyInStock: (value: boolean) => void;
  totalFilteredCount: number;
  selectedSize?: string;
  onResetSize?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onlyInStock,
  onToggleOnlyInStock,
  totalFilteredCount,
  selectedSize,
  onResetSize,
}) => {
  return (
    <div className="w-full mt-4 max-w-2xl mx-auto space-y-3">
      {/* Campo de Búsqueda */}
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8F8186]">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#9C8F94]" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por prenda, casaca, polo, color (rosa, blanco, azul)..."
          className="w-full pl-10 pr-10 py-3 sm:py-3.5 bg-white border border-[#EED7DF] rounded-2xl text-sm sm:text-base text-[#2D282A] placeholder-[#9E9096] focus:outline-hidden focus:ring-2 focus:ring-[#D47A92]/40 focus:border-[#C05C77] shadow-2xs transition-all"
        />

        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#9E9096] hover:text-[#2D282A] cursor-pointer"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-4 h-4 rounded-full bg-stone-100 p-0.5" />
          </button>
        )}
      </div>

      {/* Controles secundarios: Filtro de Disponibilidad, Talla Activa y Conteo */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-[#6B5F64]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onToggleOnlyInStock(!onlyInStock)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer select-none ${
              onlyInStock
                ? 'bg-[#FCECEF] border-[#E8BAC6] text-[#8C3F54] font-medium'
                : 'bg-white/80 border-[#EED7DF] text-[#6B5F64] hover:bg-stone-50'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-xs flex items-center justify-center border ${
                onlyInStock ? 'bg-[#C05C77] border-[#C05C77] text-white' : 'border-stone-400 bg-white'
              }`}
            >
              {onlyInStock && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <span>Solo prendas con stock</span>
          </button>

          {/* Badge de Talla Activa con botón para remover */}
          {selectedSize && selectedSize.toLowerCase() !== 'todas' && onResetSize && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF5F6] border border-[#ECD1D8] text-[#8C3F54] font-medium animate-in fade-in duration-150">
              <span>Talla: <strong>{selectedSize}</strong></span>
              <button
                type="button"
                onClick={onResetSize}
                className="hover:text-stone-900 cursor-pointer ml-0.5 p-0.5 rounded-full hover:bg-[#F0D0D8]"
                title="Quitar filtro de talla"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        <span className="text-stone-500">
          Mostrando <strong className="text-[#2D282A]">{totalFilteredCount}</strong> prenda
          {totalFilteredCount === 1 ? '' : 's'}
        </span>
      </div>
    </div>
  );
};
