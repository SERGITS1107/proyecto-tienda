import { useState, useEffect, useMemo, useCallback } from 'react';
import { Product, Category } from '../types/product';
import {
  fetchProducts,
  fetchCategories,
  filterAndSearchProducts,
  extractAvailableSizes,
} from '../services/productService';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromFirestore, setIsFromFirestore] = useState<boolean>(false);

  // Filtros activos
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedSize, setSelectedSize] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  // Producto seleccionado para vista de detalle (modal)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Carga de datos
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchProducts();
      const loadedCategories = await fetchCategories(result.products);

      setProducts(result.products);
      setIsFromFirestore(result.isFromFirestore);
      setCategories(loadedCategories);
    } catch (err) {
      setError('No fue posible cargar el catálogo. Por favor, reintenta en un momento.');
      console.error('Error fetching catalog data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Tallas disponibles dinámicamente según la categoría activa
  const availableSizes = useMemo(() => {
    return extractAvailableSizes(products, selectedCategory);
  }, [products, selectedCategory]);

  // Si se cambia de categoría y la talla previamente elegida no existe en la nueva categoría, restablecer a 'todas'
  useEffect(() => {
    if (selectedSize !== 'todas') {
      const sizeStillExists = availableSizes.some(
        (size) => size.toLowerCase() === selectedSize.toLowerCase()
      );
      if (!sizeStillExists) {
        setSelectedSize('todas');
      }
    }
  }, [selectedCategory, availableSizes, selectedSize]);

  // Función controlada para cambiar de categoría asegurando coherencia de tallas
  const handleSelectCategory = useCallback(
    (newCategory: string) => {
      setSelectedCategory(newCategory);
      // Validar si la talla seleccionada existe en la nueva categoría
      const newCategorySizes = extractAvailableSizes(products, newCategory);
      const isSizeValidInNewCategory = newCategorySizes.some(
        (s) => s.toLowerCase() === selectedSize.toLowerCase()
      );
      if (!isSizeValidInNewCategory) {
        setSelectedSize('todas');
      }
    },
    [products, selectedSize]
  );

  // Lista calculada según filtros de búsqueda, categoría, talla y stock
  const filteredProducts = useMemo(() => {
    return filterAndSearchProducts(products, {
      categoria: selectedCategory,
      talla: selectedSize,
      busqueda: searchQuery,
      soloDisponibles: onlyInStock,
    });
  }, [products, selectedCategory, selectedSize, searchQuery, onlyInStock]);

  // Conteo de prendas por categoría para mostrar indicadores
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { todos: products.length };
    products.forEach((p) => {
      const catKey = p.categoria.toLowerCase();
      counts[catKey] = (counts[catKey] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Limpiar todos los filtros
  const resetFilters = useCallback(() => {
    setSelectedCategory('todos');
    setSelectedSize('todas');
    setSearchQuery('');
    setOnlyInStock(false);
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    isFromFirestore,
    isCollectionEmpty: products.length === 0 && !loading && !error,
    refreshCatalog: loadData,
    selectedCategory,
    setSelectedCategory: handleSelectCategory,
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
  };
}
