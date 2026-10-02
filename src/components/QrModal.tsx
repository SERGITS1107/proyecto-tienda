import React, { useState } from 'react';
import { X, QrCode, Copy, Check, ExternalLink, Printer } from 'lucide-react';
import { Logo } from './Logo';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // URL oficial y definitiva del catálogo para los percheros y tienda física
  const catalogUrl = 'https://milagritos-cat-logo-moda-y-estilo.ai.studio/';
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&color=2D282A&bgcolor=FAF5F6&data=${encodeURIComponent(
    catalogUrl
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(catalogUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-[#F2DFE4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#FAF5F6] border-b border-[#F0DCE2]">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#C05C77]" />
            <h3 className="font-display font-semibold text-lg text-[#2D282A]">
              Acceso QR en Tienda
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-[#FCECEF] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido QR */}
        <div className="p-6 text-center space-y-4">
          <p className="text-xs text-[#665D61]">
            Este es el código QR que se colocará en los mostradores y percheros de la tienda física
            para que los clientes ingresen directamente desde su celular.
          </p>

          {/* Tarjeta de Exhibición para Imprimir o Mostrar */}
          <div className="mx-auto p-5 rounded-2xl bg-[#FAF5F6] border-2 border-dashed border-[#ECD1D8] inline-block shadow-inner">
            <div className="mb-3">
              <Logo size="sm" showSubtitle={true} />
            </div>

            <div className="relative mx-auto w-48 h-48 sm:w-52 sm:h-52 bg-white rounded-xl p-2 shadow-xs border border-[#F2DFE4] flex items-center justify-center">
              <img
                src={qrImageUrl}
                alt="Código QR del catálogo Milagritos"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <p className="mt-3 text-[11px] font-medium text-[#7D7075] uppercase tracking-wider">
              Escanea con tu cámara móvil
            </p>
          </div>

          {/* URL actual */}
          <div className="space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <label className="text-[11px] uppercase font-semibold text-[#8C7E84] tracking-wider block">
                Enlace directo del catálogo (Tienda Oficial)
              </label>
              <a
                href={catalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-[#C05C77] hover:underline font-medium"
              >
                <span>Probar enlace</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={catalogUrl}
                className="w-full px-3 py-2 text-xs font-mono bg-stone-50 border border-stone-200 rounded-lg text-[#3A3335] select-all truncate"
              />
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-[#FCECEF] hover:bg-[#F8D5DE] text-[#8C3F54] border border-[#F4D6DC] transition-colors shrink-0 cursor-pointer"
                title="Copiar enlace"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 text-xs text-[#5C5055] hover:text-[#2D282A] font-medium cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#C05C77]" />
            <span>Imprimir para perchero</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#2D282A] hover:bg-[#3D3739] transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
