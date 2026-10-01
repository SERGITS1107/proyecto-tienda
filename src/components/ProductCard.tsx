import React, { useState } from 'react';
import { Product } from '../types/product';
import { Eye, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const isAvailable = product.stock > 0 && product.estado === 'activo';

  // Fallback visual en caso de que la red falle
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500" fill="%23FAF5F6"><rect width="400" height="500" fill="%23F7E9ED"/><text x="50%" y="45%" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%238C3F54">Milagritos Moda</text><text x="50%" y="55%" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23A17B87">${encodeURIComponent(
    product.nombre
  )}</text></svg>`;

  return (
    <article
      onClick={() => onSelect(product)}
      className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col cursor-pointer ${
        isAvailable
          ? 'border-[#F2DFE4] hover:border-[#DDA8B6] hover:shadow-md'
          : 'border-stone-200 bg-stone-50/70 opacity-90'
      }`}
    >
      {/* Contenedor de Fotografía */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-[#FCECEF]">
        <img
          src={imageError ? fallbackSvg : product.imagen}
          alt={product.nombre}
          loading="lazy"
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 ${
            !isAvailable ? 'grayscale-[0.4] contrast-95' : ''
          }`}
        />

        {/* Badge de Categoría */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-white/95 backdrop-blur-xs text-[#4A4245] shadow-xs border border-white/60">
            {product.categoria}
          </span>
        </div>

        {/* Badge de Disponibilidad / Stock */}
        <div className="absolute top-3 right-3 z-10">
          {isAvailable ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Disponible</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-stone-900 text-stone-100 shadow-2xs">
              <AlertCircle className="w-3 h-3 text-rose-300" />
              <span>Agotado</span>
            </span>
          )}
        </div>

        {/* Overlay hover para móvil y desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white text-[#2D282A] shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#C05C77]" />
            <span>Ver detalles</span>
          </span>
        </div>
      </div>

      {/* Información del Producto */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Fila: Color & Referencia */}
          <div className="flex items-center justify-between text-xs text-[#73686D] mb-1.5">
            <div className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full border border-stone-300 shadow-2xs shrink-0"
                style={{ backgroundColor: product.colorHex || '#ddd' }}
                title={`Color: ${product.color}`}
              />
              <span className="font-medium text-[#50464B]">{product.color}</span>
            </div>

            {product.codigoReferencia && (
              <span className="text-[10px] font-mono tracking-wider text-[#9E9096]">
                {product.codigoReferencia}
              </span>
            )}
          </div>

          {/* Nombre de la prenda */}
          <h3 className="font-display font-semibold text-lg text-[#2D282A] group-hover:text-[#C05C77] transition-colors leading-snug line-clamp-1">
            {product.nombre}
          </h3>

          {/* Descripción resumida */}
          <p className="text-xs sm:text-sm text-[#665D61] mt-1.5 line-clamp-2 leading-relaxed">
            {product.descripcion}
          </p>

          {/* Tallas disponibles */}
          <div className="mt-3 pt-2.5 border-t border-[#F5E6EB]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#7D7075] uppercase tracking-wider">
                Tallas:
              </span>
              <div className="flex flex-wrap gap-1">
                {product.tallas.map((talla) => (
                  <span
                    key={talla}
                    className="inline-block px-1.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#FAF5F6] border border-[#ECD1D8] text-[#4A4245]"
                  >
                    {talla}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Precio & Botón de detalle */}
        <div className="mt-4 pt-3 border-t border-[#F5E6EB] flex items-center justify-between">
          <div>
            <span className="block text-[10px] uppercase font-semibold text-[#8C7E84] tracking-wider">
              Precio
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-[#2D282A]">
              S/ {product.precio.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-[#8C3F54] bg-[#FCECEF] hover:bg-[#F8D5DE] border border-[#F4D6DC] transition-colors cursor-pointer"
          >
            <span>Detalle</span>
          </button>
        </div>
      </div>
    </article>
  );
};
