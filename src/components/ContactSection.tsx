import React from 'react';
import { MessageCircle, Instagram, Facebook, MapPin, Clock, Heart, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contacto" className="py-16 sm:py-24 bg-white/60 border-t border-[#F0DCE2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Cabecera de la sección */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C05C77]">
            Estamos cerca de ti
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#2D282A] mt-2 mb-3">
            Visítanos y Contáctanos
          </h2>
          <p className="text-sm sm:text-base text-[#665D61]">
            ¿Tienes alguna consulta sobre una prenda o deseas verificar una talla? Nuestro equipo en
            tienda estará encantado de ayudarte.
          </p>
        </div>

        {/* Tarjetas de Información de Contacto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* WhatsApp */}
          <div className="p-6 rounded-2xl bg-white border border-[#F2DFE4] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#25D366] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#2D282A]">WhatsApp</h3>
                <p className="text-xs text-[#7A6E73]">Atención y consultas rápidas</p>
              </div>
            </div>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <a
                href="https://wa.me/51954792571?text=Hola%20Milagritos,%20deseo%20consultar%20sobre%20una%20prenda%20del%20catálogo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs transition-colors border border-emerald-200"
              >
                <span>954 792 571</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-emerald-600 font-medium">Escríbenos</span>
            </div>
          </div>

          {/* Instagram */}
          <div className="p-6 rounded-2xl bg-white border border-[#F2DFE4] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#E1306C] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#C05C77] flex items-center justify-center">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#2D282A]">Instagram</h3>
                <p className="text-xs text-[#7A6E73]">Novedades y outfits</p>
              </div>
            </div>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <a
                href="https://www.instagram.com/sergio_guevara11/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-pink-50 hover:bg-pink-100 text-[#8C3F54] font-semibold text-xs transition-colors border border-[#F2DFE4]"
              >
                <span>@sergio_guevara11</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-[#A1586B] font-medium">Ver perfil</span>
            </div>
          </div>

          {/* Facebook */}
          <div className="p-6 rounded-2xl bg-white border border-[#F2DFE4] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#1877F2] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Facebook className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#2D282A]">Facebook</h3>
                <p className="text-xs text-[#7A6E73]">Comunidad Milagritos</p>
              </div>
            </div>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <a
                href="https://www.facebook.com/sergio.guevara.587606?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold text-xs transition-colors border border-blue-200"
              >
                <span>Sergio Guevara</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-blue-600 font-medium">Conectar</span>
            </div>
          </div>

          {/* Dirección */}
          <div className="p-6 rounded-2xl bg-white border border-[#F2DFE4] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#DDA8B6] transition-all sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FCECEF] text-[#8C3F54] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#2D282A]">Dirección de la Tienda</h3>
                <p className="text-xs text-[#7A6E73]">Ubicación del local comercial</p>
              </div>
            </div>
            <div className="pt-2 border-t border-stone-100">
              <p className="text-xs sm:text-sm font-medium text-[#3A3335] leading-relaxed">
                Andrés Avelino Cáceres, Galerías La Cachina, Galería 23
              </p>
              <p className="text-[11px] text-[#7A6E73] mt-1">
                Punto de atención presencial y probadores disponibles.
              </p>
            </div>
          </div>

          {/* Horario de atención */}
          <div className="p-6 rounded-2xl bg-white border border-[#F2DFE4] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#DDA8B6] transition-all sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#2D282A]">Horario de Atención</h3>
                <p className="text-xs text-[#7A6E73]">Puertas abiertas al público</p>
              </div>
            </div>
            <div className="pt-2 border-t border-stone-100">
              <p className="text-xs sm:text-sm font-semibold text-[#2D282A]">
                8:00 am – 5:30 pm
              </p>
              <p className="text-xs text-[#665D61] mt-0.5">
                De Lunes a Domingo (Todos los días)
              </p>
            </div>
          </div>
        </div>

        {/* Mensaje de bienvenida en tienda */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-[#FCECEF] via-[#FAF5F6] to-[#FCECEF] border border-[#F4D6DC] text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#733547]">
            <Heart className="w-3.5 h-3.5 fill-current text-[#C05C77]" />
            <span>¡Te esperamos en Galerías La Cachina, Galería 23 para que pruebes tu prenda favorita!</span>
          </div>
        </div>
      </div>
    </section>
  );
};
