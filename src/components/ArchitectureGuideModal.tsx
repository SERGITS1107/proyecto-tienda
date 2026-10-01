import React, { useState } from 'react';
import { X, Database, Bot, Send, ShieldCheck, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

interface ArchitectureGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureGuideModal: React.FC<ArchitectureGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'diagram' | 'firestore' | 'n8n' | 'security'>('diagram');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 border border-[#F2DFE4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF5F6] border-b border-[#F0DCE2]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#FCECEF] text-[#C05C77]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-[#2D282A]">
                Arquitectura del Sistema: Milagritos
              </h3>
              <p className="text-xs text-[#7A6E73]">
                Hoja de ruta para Firestore, n8n, Telegram y Gemini
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-[#FCECEF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de Navegación */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('diagram')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'diagram'
                ? 'border-[#C05C77] text-[#8C3F54]'
                : 'border-transparent text-[#665D61] hover:text-[#2D282A]'
            }`}
          >
            Diagrama de Flujo
          </button>
          <button
            onClick={() => setActiveTab('firestore')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'firestore'
                ? 'border-[#C05C77] text-[#8C3F54]'
                : 'border-transparent text-[#665D61] hover:text-[#2D282A]'
            }`}
          >
            1. Conexión Firestore
          </button>
          <button
            onClick={() => setActiveTab('n8n')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'n8n'
                ? 'border-[#C05C77] text-[#8C3F54]'
                : 'border-transparent text-[#665D61] hover:text-[#2D282A]'
            }`}
          >
            2. n8n + Telegram + IA
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'security'
                ? 'border-[#C05C77] text-[#8C3F54]'
                : 'border-transparent text-[#665D61] hover:text-[#2D282A]'
            }`}
          >
            3. Qué NO Modificar
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#443C3F]">
          {activeTab === 'diagram' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF5F6] border border-[#F2DFE4]">
                <h4 className="font-semibold text-[#2D282A] text-sm mb-3">
                  Flujo de Arquitectura General
                </h4>
                <div className="font-mono text-xs text-stone-700 bg-white p-4 rounded-xl border border-stone-200 overflow-x-auto leading-relaxed">
                  {`[ CLIENTE EN TIENDA ]
         │
         ▼  (Escanea QR con celular)
┌────────────────────────┐
│  CATÁLOGO MILAGRITOS   │ (React + TypeScript + Tailwind)
│  (Lectura informativa) │
└───────────┬────────────┘
            │
            ▼ (Lee en tiempo real)
┌────────────────────────┐
│   FIRESTORE DATABASE   │
│  Colección 'productos' │
└───────────▲────────────┘
            │
┌───────────┴────────────┐
│   FLUJO DE INGRESO     │
└───────────▲────────────┘
            │ (Guarda producto confirmado)
┌────────────────────────┐
│      n8n WORKFLOW      │
└───────────▲────────────┘
     │            ▲
     │            │ (Envía sugerencia / Recibe confirmación)
     ▼            │
[ GEMINI IA ]     │
(Analiza foto     │
y extrae color,   │
categoría, etc)   │
                  ▼
          [ TELEGRAM BOT ]
                  ▲
                  │ (Envía foto de prenda con cámara de celular)
          [ DUEÑA DE TIENDA ]`}
                </div>
              </div>

              <p className="text-xs text-stone-600">
                La aplicación web no tiene dependencias directas con Telegram ni n8n, lo cual la
                mantiene ultraligera y segura para los clientes. Toda la sincronización se realiza a
                través de Firestore como única fuente de verdad.
              </p>
            </div>
          )}

          {activeTab === 'firestore' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-[#2D282A]">
                Estructura de Datos en Firestore
              </h4>
              <p className="text-xs text-stone-600">
                El archivo <code className="bg-stone-100 px-1 py-0.5 rounded-sm">src/types/product.ts</code> y el servicio <code className="bg-stone-100 px-1 py-0.5 rounded-sm">src/services/productService.ts</code> ya están estructurados con la colección exacta de Firestore:
              </p>

              <div className="bg-stone-900 text-stone-100 p-4 rounded-xl text-xs font-mono space-y-1 overflow-x-auto">
                <p className="text-[#EBB4C0]">// Colección: productos</p>
                <p>{`{`}</p>
                <p className="pl-4">id: string,               <span className="text-stone-400">// Generado automáticamente por Firestore</span></p>
                <p className="pl-4">nombre: string,           <span className="text-stone-400">// ej: "Casaca Oversize Rosa"</span></p>
                <p className="pl-4">descripcion: string,      <span className="text-stone-400">// Texto descriptivo</span></p>
                <p className="pl-4">categoria: string,        <span className="text-stone-400">// "Casacas" | "Polos" | "Pantalones"</span></p>
                <p className="pl-4">precio: number,           <span className="text-stone-400">// ej: 89.90</span></p>
                <p className="pl-4">color: string,            <span className="text-stone-400">// ej: "Rosa"</span></p>
                <p className="pl-4">colorHex: string,         <span className="text-stone-400">// ej: "#EBB4C0" (opcional para viñeta)</span></p>
                <p className="pl-4">tallas: string[],         <span className="text-stone-400">// ej: ["S", "M", "L", "XL"]</span></p>
                <p className="pl-4">stock: number,            <span className="text-stone-400">// 0 = Agotado, &gt; 0 = Disponible</span></p>
                <p className="pl-4">imagen: string,           <span className="text-stone-400">// URL pública en Firebase Storage</span></p>
                <p className="pl-4">estado: string,           <span className="text-stone-400">// "activo" | "agotado" | "inactivo"</span></p>
                <p className="pl-4">fechaRegistro: string     <span className="text-stone-400">// ISO 8601 string o Timestamp</span></p>
                <p>{`}`}</p>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  Para activar Firestore, sólo se requiere inicializar el SDK en <code className="font-mono">src/services/firebaseConfig.ts</code> y alternar la constante <code className="font-mono">USE_FIRESTORE = true</code> en <code className="font-mono">productService.ts</code>. Los componentes no necesitan ningún cambio.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'n8n' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-[#2D282A]">
                Futura Conexión de n8n con Telegram y Gemini
              </h4>
              <p className="text-xs text-stone-600">
                Cuando implementemos el registro automático por Telegram, el webhook de n8n orquestará los siguientes pasos:
              </p>

              <ol className="space-y-3 text-xs text-stone-700">
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="w-5 h-5 rounded-full bg-[#C05C77] text-white flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                  <div>
                    <strong>Dueña envía foto en Telegram:</strong> Se crea un bot privado en Telegram con <code className="font-mono">@BotFather</code> donde sólo la dueña tiene permiso para interactuar.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="w-5 h-5 rounded-full bg-[#C05C77] text-white flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                  <div>
                    <strong>n8n recibe la imagen y llama a Gemini:</strong> El modelo de visión analiza la foto y genera un JSON con: <code className="font-mono">categoria</code>, <code className="font-mono">nombre</code>, <code className="font-mono">color</code> y <code className="font-mono">descripcion</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="w-5 h-5 rounded-full bg-[#C05C77] text-white flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                  <div>
                    <strong>Confirmación de la dueña:</strong> Como Gemini NO debe inventar precios ni stock, el bot le formula a la dueña: <em>"¿Cuál es el precio, stock y tallas disponibles?"</em>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="w-5 h-5 rounded-full bg-[#C05C77] text-white flex items-center justify-center font-bold text-[10px] shrink-0">4</span>
                  <div>
                    <strong>n8n sube la foto a Firebase Storage y guarda en Firestore:</strong> El nuevo registro aparece de inmediato en el catálogo web que ven los clientes.
                  </div>
                </li>
              </ol>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-[#2D282A]">
                Reglas de Arquitectura y Qué NO Modificar
              </h4>

              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-xs text-rose-900 space-y-2">
                <p className="font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  Para evitar romper futuras integraciones:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>No cambies los nombres de los campos en <code className="font-mono">src/types/product.ts</code>:</strong> Si cambias <code className="font-mono">nombre</code> por <code className="font-mono">title</code> o <code className="font-mono">precio</code> por <code className="font-mono">cost</code>, el nodo de n8n no podrá sincronizar los documentos con Firestore.
                  </li>
                  <li>
                    <strong>Mantén los productos fuera de los componentes React:</strong> Siempre usa <code className="font-mono">src/services/productService.ts</code> para consultar o filtrar datos.
                  </li>
                  <li>
                    <strong>No coloques API keys de Telegram o tokens de n8n en el frontend:</strong> Estos tokens van exclusivamente en el servidor n8n o variables de entorno.
                  </li>
                  <li>
                    <strong>No agregues lógica de carrito ni checkout en este catálogo:</strong> El objetivo de esta fase es la consulta ágil en tienda física mediante código QR.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Pie */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#2D282A] hover:bg-[#3D3739] transition-colors cursor-pointer"
          >
            Cerrar Guía
          </button>
        </div>
      </div>
    </div>
  );
};
