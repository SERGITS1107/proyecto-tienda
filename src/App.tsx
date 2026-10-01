/**
 * Milagritos - Catálogo Digital "MODA Y ESTILO"
 * Aplicación Web Mobile-First para consulta de prendas en tienda física mediante código QR.
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { SearchBar } from './components/SearchBar';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QrModal } from './components/QrModal';
import { ArchitectureGuideModal } from './components/ArchitectureGuideModal';
import { useProducts } from './hooks/useProducts';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const {
    products,
    categories,
    loading,
    error,
    isFromFirestore,
    isCollectionEmpty,
    refreshCatalog,
    selectedCategory,
    setSelectedCategory,
    selectedSize,
    setSelectedSize,
    availableSizes,
    searchQuery,
    setSearchQuery,
    onlyInStock,
    setOnlyInStock,
    selectedProduct,
    setSelectedProduct,
    filteredProducts,
    categoryCounts,
    resetFilters,
  } = useProducts();

  // Estados para modales de apoyo
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);

  // Scroll suave al catálogo
  const handleScrollToCatalog = () => {
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      const headerOffset = 76;
      const elementPosition = catalogElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const hasActiveFilters =
    selectedCategory.toLowerCase() !== 'todos' ||
    selectedSize.toLowerCase() !== 'todas' ||
    searchQuery.trim() !== '' ||
    onlyInStock;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5F6] text-[#2D282A] font-sans selection:bg-[#F3C4D0] selection:text-[#2D282A]">
      {/* 1. Header con navegación e identidad de marca */}
      <Header
        onOpenQrModal={() => setIsQrModalOpen(true)}
        onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
      />

      {/* Contenedor Principal */}
      <main className="flex-1">
        {/* 2. Hero: "Encuentra tu próximo look favorito" */}
        <Hero
          onExploreClick={handleScrollToCatalog}
          onOpenQrModal={() => setIsQrModalOpen(true)}
        />

        {/* 3. Sección Catálogo */}
        <section id="catalogo" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Filtros por Categoría y Talla Dinámica */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
            availableSizes={availableSizes}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />

          {/* Buscador de prendas por nombre, categoría y color */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onlyInStock={onlyInStock}
            onToggleOnlyInStock={setOnlyInStock}
            totalFilteredCount={filteredProducts.length}
            selectedSize={selectedSize}
            onResetSize={() => setSelectedSize('todas')}
          />

          {/* Grilla Responsiva de Productos */}
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            onSelectProduct={setSelectedProduct}
            onResetFilters={resetFilters}
            hasActiveFilters={hasActiveFilters}
            isCollectionEmpty={isCollectionEmpty}
            onRefresh={refreshCatalog}
          />
        </section>

        {/* 4. Sección de Contacto e Información de Tienda Física */}
        <ContactSection />
      </main>

      {/* 5. Footer con información de marca y copyright 2026 */}
      <Footer />

      {/* Modal de Detalle de Prenda (Mobile-First, sin carrito de compras) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Modal del Código QR de Tienda */}
      <QrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />

      {/* Modal de Arquitectura Futura (Firestore, n8n, Telegram, Gemini) */}
      <ArchitectureGuideModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
}
