import React from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { Shirt, RotateCcw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onSelectProduct: (product: Product) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  isCollectionEmpty?: boolean;
  onRefresh?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  onSelectProduct,
  onResetFilters,
  hasActiveFilters,
  isCollectionEmpty,
  onRefresh,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-8">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl overflow-hidden border border-[#F2DFE4] p-4 animate-pulse space-y-4"
          >
            <div className="aspect-4/5 bg-[#F8E7EC] rounded-xl w-full" />
            <div className="space-y-2">
              <div className="h-4 bg-stone-200 rounded-sm w-1/3" />
              <div className="h-6 bg-stone-200 rounded-sm w-3/4" />
              <div className="h-3 bg-stone-100 rounded-sm w-full" />
              <div className="h-3 bg-stone-100 rounded-sm w-2/3" />
            </div>
            <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
              <div className="h-6 bg-stone-200 rounded-sm w-20" />
              <div className="h-8 bg-stone-200 rounded-lg w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Caso: Colección completamente vacía en Firestore (sin prendas creadas)
  if (isCollectionEmpty) {
    return (
      <div className="mt-12 text-center py-16 px-4 bg-white/70 rounded-3xl border border-[#F0DCE2] max-w-lg mx-auto">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#FCECEF] flex items-center justify-center text-[#C05C77]">
          <Shirt className="w-7 h-7" />
        </div>
        <h3 className="font-display text-xl font-semibold text-[#2D282A] mb-2">
          Colección vacía en Firestore
        </h3>
        <p className="text-sm text-[#665D61] max-w-xs mx-auto mb-6">
          Aún no hay prendas registradas en la colección <code className="font-mono bg-stone-100 px-1 py-0.5 rounded">productos</code>.
        </p>

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#2D282A] bg-[#FCECEF] hover:bg-[#F8DDE4] border border-[#F4D6DC] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C05C77]" />
            <span>Recargar catálogo</span>
          </button>
        )}
      </div>
    );
  }

  // Caso: No hay resultados para los filtros seleccionados
  if (products.length === 0) {
    return (
      <div className="mt-12 text-center py-16 px-4 bg-white/70 rounded-3xl border border-[#F0DCE2] max-w-lg mx-auto">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#FCECEF] flex items-center justify-center text-[#C05C77]">
          <Shirt className="w-7 h-7" />
        </div>
        <h3 className="font-display text-xl font-semibold text-[#2D282A] mb-2">
          No se encontraron prendas
        </h3>
        <p className="text-sm text-[#665D61] max-w-xs mx-auto mb-6">
          No hay productos que coincidan con los criterios de búsqueda o categoría seleccionada.
        </p>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#2D282A] bg-[#FCECEF] hover:bg-[#F8DDE4] border border-[#F4D6DC] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer filtros</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      id="listado-prendas"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-8"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
        />
      ))}
    </div>
  );
};
