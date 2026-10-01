/**
 * Definiciones de tipos para el catálogo de Milagritos: MODA Y ESTILO.
 * Estructurado para coincidir 1:1 con la futura colección de Firebase Firestore ('productos' y 'categorias').
 */

export type ProductStatus = 'activo' | 'agotado' | 'inactivo';

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  color: string;
  colorHex?: string;
  tallas: string[];
  stock: number;
  imagen: string;
  estado: ProductStatus;
  fechaRegistro: string;
  // Campos auxiliares opcionales para consulta en tienda física
  codigoReferencia?: string;
  destacado?: boolean;
}

export interface Category {
  id: string;
  nombre: string;
  slug: string;
  descripcion?: string;
}

export interface ProductFilterOptions {
  categoria?: string;
  talla?: string;
  busqueda?: string;
  soloDisponibles?: boolean;
  orden?: 'reciente' | 'precio-asc' | 'precio-desc' | 'nombre';
}
