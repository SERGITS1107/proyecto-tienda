import React, { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { X, CheckCircle2, AlertCircle, Share2, Store, ArrowLeft, MessageCircle } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const [imageError, setImageError] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Bloquear el scroll de fondo mientras el modal está abierto
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const isAvailable = product.stock > 0 && product.estado === 'activo';

  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="700" viewBox="0 0 600 700" fill="%23FAF5F6"><rect width="600" height="700" fill="%23F7E9ED"/><text x="50%" y="45%" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%238C3F54">Milagritos Moda y Estilo</text><text x="50%" y="55%" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%23A17B87">${encodeURIComponent(
    product.nombre
  )}</text></svg>`;

  const handleShare = async () => {
    const shareData = {
      title: `${product.nombre} - Milagritos Moda`,
      text: `Mira esta prenda en el catálogo de Milagritos: ${product.nombre} (S/ ${product.precio.toFixed(2)})`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Ignorar si canceló
      }
    } else {
      if (product.codigoReferencia) {
        navigator.clipboard?.writeText(
          `${product.nombre} - Ref: ${product.codigoReferencia} (S/ ${product.precio.toFixed(2)})`
        );
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera / Barra de Cierre para Móvil */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-stone-100">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="sm:hidden p-1.5 rounded-full hover:bg-stone-100 text-[#4A4245]"
              aria-label="Cerrar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xs uppercase font-semibold tracking-wider text-[#C05C77]">
              {product.categoria}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-[#4A4245] hover:bg-[#FCECEF] transition-colors"
              title="Compartir o copiar referencia de prenda"
            >
              <Share2 className="w-4 h-4 text-[#8C3F54]" />
            </button>
            <button
              onClick={onClose}
              className="hidden sm:flex p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenido con Scroll para Dispositivos Móviles */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {/* Imagen Grande */}
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-[#FCECEF] border border-[#F2DFE4]">
              <img
                src={imageError ? fallbackSvg : product.imagen}
                alt={product.nombre}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover object-top ${
                  !isAvailable ? 'grayscale-[0.4]' : ''
                }`}
              />

              {/* Distintivo de Disponibilidad */}
              <div className="absolute top-3 right-3">
                {isAvailable ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Disponible</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 text-stone-100 shadow-sm">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-300" />
                    <span>Agotado</span>
                  </span>
                )}
              </div>
            </div>

            {/* Datos Detallados de la Prenda */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono text-[#9E9096] mb-1">
                  REF: {product.codigoReferencia || product.id}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#2D282A] leading-tight">
                  {product.nombre}
                </h2>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-[#2D282A]">
                    S/ {product.precio.toFixed(2)}
                  </span>
                  <span className="text-xs text-[#7A6E73] font-medium">(Precio en tienda)</span>
                </div>
              </div>

              {/* Fila: Color */}
              <div className="pt-3 border-t border-stone-100">
                <span className="text-xs uppercase font-semibold text-[#7A6E73] tracking-wider block mb-2">
                  Color
                </span>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF5F6] border border-[#F2DFE4]">
                  <span
                    className="w-4 h-4 rounded-full border border-stone-300 shadow-2xs"
                    style={{ backgroundColor: product.colorHex || '#bbb' }}
                  />
                  <span className="text-sm font-medium text-[#2D282A]">{product.color}</span>
                </div>
              </div>

              {/* Fila: Tallas */}
              <div className="pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-semibold text-[#7A6E73] tracking-wider">
                    Tallas Disponibles
                  </span>
                  <span className="text-[11px] text-[#C05C77]">Consulta probador</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.tallas.map((talla) => (
                    <span
                      key={talla}
                      className="px-3.5 py-1.5 rounded-lg text-sm font-semibold bg-[#FAF5F6] border border-[#ECD1D8] text-[#2D282A]"
                    >
                      {talla}
                    </span>
                  ))}
                </div>
              </div>

              {/* Estado de Stock */}
              <div className="pt-3 border-t border-stone-100">
                <span className="text-xs uppercase font-semibold text-[#7A6E73] tracking-wider block mb-1">
                  Disponibilidad en Perchero
                </span>
                {isAvailable ? (
                  <p className="text-xs sm:text-sm text-emerald-800 font-medium">
                    {product.stock} unidades en tienda física.
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm text-stone-500 font-medium">
                    Prenda actualmente no disponible en tienda.
                  </p>
                )}
              </div>

              {/* Descripción */}
              <div className="pt-3 border-t border-stone-100">
                <span className="text-xs uppercase font-semibold text-[#7A6E73] tracking-wider block mb-1.5">
                  Descripción
                </span>
                <p className="text-sm text-[#554D51] leading-relaxed">
                  {product.descripcion}
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta de Asistencia en Tienda Física (Informativo, sin carrito de compras) */}
          <div className="mt-4 p-4 rounded-2xl bg-[#FCECEF]/70 border border-[#F4D6DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white text-[#C05C77] shrink-0 shadow-2xs">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#2D282A] uppercase tracking-wide">
                  Consulta de Prenda en Tienda
                </h4>
                <p className="text-xs text-[#6B5F64] mt-0.5">
                  Pide esta prenda a nuestra asesora mostrando el código{' '}
                  <strong className="text-[#2D282A] font-mono">
                    {product.codigoReferencia || product.id}
                  </strong>{' '}
                  en Andrés Avelino Cáceres, Galerías La Cachina, Galería 23.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <a
                href={`https://wa.me/51954792571?text=${encodeURIComponent(
                  `Hola Milagritos, deseo consultar disponibilidad de la prenda: ${product.nombre} (Ref: ${
                    product.codigoReferencia || product.id
                  }) de S/ ${product.precio.toFixed(2)}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors shadow-2xs"
                title="Consultar por WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Consultar por WhatsApp</span>
              </a>

              {copiedCode && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0">
                  ¡Código copiado!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pie del modal */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <span className="text-[11px] text-[#7A6E73]">
            Catálogo digital de consulta • Milagritos: MODA Y ESTILO
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-semibold text-[#2D282A] bg-white hover:bg-stone-100 border border-stone-300 transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
