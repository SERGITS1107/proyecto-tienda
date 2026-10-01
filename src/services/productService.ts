/**
 * Capa de Servicios para Gestión de Productos y Categorías.
 * Conexión activa con Firebase Cloud Firestore y soporte de respaldo (fallback).
 */

import { Product, Category, ProductFilterOptions } from '../types/product';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../data/mockProducts';
import { db } from './firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

// Bandera para alternar entre datos locales de demostración y Firebase Firestore
// Por defecto lee la variable de entorno VITE_USE_FIRESTORE o activa Firestore (true)
export const USE_FIRESTORE: boolean =
  typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_USE_FIRESTORE !== undefined
    ? import.meta.env.VITE_USE_FIRESTORE === 'true'
    : true;

// Nombre de colecciones de Firestore
export const FIRESTORE_COLLECTIONS = {
  PRODUCTOS: 'productos',
  CATEGORIAS: 'categorias',
} as const;

/**
 * Convierte cualquier formato de fecha o Timestamp de Firestore a string legible YYYY-MM-DD
 */
export function formatFirestoreDate(rawDate: unknown): string {
  if (!rawDate) return '2026-09-28';
  if (typeof rawDate === 'string') return rawDate;
  if (typeof rawDate === 'object') {
    const obj = rawDate as Record<string, unknown>;
    // Timestamp de Firebase con método toDate()
    if (typeof obj.toDate === 'function') {
      try {
        const d = (obj.toDate as () => Date)();
        return d.toISOString().split('T')[0];
      } catch {
        // Fallback
      }
    }
    // Objeto con propiedad seconds de Firestore
    if (typeof obj.seconds === 'number') {
      return new Date(obj.seconds * 1000).toISOString().split('T')[0];
    }
    if (rawDate instanceof Date) {
      return rawDate.toISOString().split('T')[0];
    }
  }
  return String(rawDate);
}

/**
 * Convierte un documento recibido de Firestore al modelo Product garantizando tipado seguro
 */
export function docToProduct(id: string, data: Record<string, unknown>): Product {
  // Normalización de tallas a string[]
  let tallasArr: string[] = [];
  if (Array.isArray(data.tallas)) {
    tallasArr = data.tallas
      .map((t) => (t !== undefined && t !== null ? String(t).trim() : ''))
      .filter(Boolean);
  } else if (typeof data.tallas === 'string') {
    tallasArr = data.tallas
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }

  // Normalización de estado
  let estado: Product['estado'] = 'activo';
  if (data.estado === 'agotado' || data.estado === 'inactivo') {
    estado = data.estado;
  }

  return {
    id: id,
    nombre: typeof data.nombre === 'string' && data.nombre ? data.nombre : 'Prenda sin nombre',
    descripcion: typeof data.descripcion === 'string' ? data.descripcion : '',
    categoria: typeof data.categoria === 'string' && data.categoria ? data.categoria : 'Varios',
    precio: typeof data.precio === 'number' ? data.precio : Number(data.precio) || 0,
    color: typeof data.color === 'string' && data.color ? data.color : 'Varios',
    colorHex: typeof data.colorHex === 'string' ? data.colorHex : undefined,
    tallas: tallasArr,
    stock: typeof data.stock === 'number' ? data.stock : Number(data.stock) || 0,
    imagen: typeof data.imagen === 'string' && data.imagen ? data.imagen : 'https://placehold.co/600x800',
    estado: estado,
    fechaRegistro: formatFirestoreDate(data.fechaRegistro),
    codigoReferencia: typeof data.codigoReferencia === 'string' ? data.codigoReferencia : undefined,
    destacado: Boolean(data.destacado),
  };
}

/**
 * Obtiene todas las prendas disponibles del catálogo desde Firestore (con fallback transparente)
 */
export async function fetchProducts(): Promise<{ products: Product[]; isFromFirestore: boolean }> {
  if (USE_FIRESTORE && db && typeof db === 'object' && 'type' in db) {
    try {
      const colRef = collection(db, FIRESTORE_COLLECTIONS.PRODUCTOS);
      const snapshot = await getDocs(colRef);

      if (!snapshot.empty) {
        const firestoreProducts = snapshot.docs.map((docSnap) =>
          docToProduct(docSnap.id, docSnap.data() as Record<string, unknown>)
        );
        return { products: firestoreProducts, isFromFirestore: true };
      }

      // Si la colección existe pero está vacía
      return { products: [], isFromFirestore: true };
    } catch (error) {
      console.warn(
        'Aviso: No fue posible leer directamente de Firestore. Activando respaldo local (fallback):',
        error
      );
      // Retorna los productos de respaldo preservados en mockProducts.ts
      return { products: [...INITIAL_PRODUCTS], isFromFirestore: false };
    }
  }

  // Si USE_FIRESTORE está en false o no está configurado
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ products: [...INITIAL_PRODUCTS], isFromFirestore: false });
    }, 100);
  });
}

/**
 * Obtiene una prenda por su identificador único
 */
export async function fetchProductById(id: string): Promise<Product | null> {
  if (USE_FIRESTORE && db && typeof db === 'object' && 'type' in db) {
    try {
      const docRef = doc(db, FIRESTORE_COLLECTIONS.PRODUCTOS, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docToProduct(docSnap.id, docSnap.data() as Record<string, unknown>);
      }
    } catch (err) {
      console.warn('Error al buscar documento en Firestore:', err);
    }
  }

  const found = INITIAL_PRODUCTS.find((p) => p.id === id);
  return found ? { ...found } : null;
}

/**
 * Obtiene la lista de categorías del catálogo
 */
export async function fetchCategories(loadedProducts?: Product[]): Promise<Category[]> {
  if (USE_FIRESTORE && db && typeof db === 'object' && 'type' in db) {
    try {
      const snapshot = await getDocs(collection(db, FIRESTORE_COLLECTIONS.CATEGORIAS));
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Category[];
      }
    } catch {
      // Ignorar y derivar categorías dinámicamente
    }
  }

  // Si los productos ya están cargados, asegura que todas las categorías existentes estén disponibles
  if (loadedProducts && loadedProducts.length > 0) {
    const categorySet = new Set<string>();
    loadedProducts.forEach((p) => {
      if (p.categoria && p.categoria.trim()) {
        categorySet.add(p.categoria.trim());
      }
    });

    const dynamicCats: Category[] = [
      { id: 'cat-todos', nombre: 'Todos', slug: 'todos', descripcion: 'Todas las prendas disponibles' },
    ];

    categorySet.forEach((catName) => {
      dynamicCats.push({
        id: `cat-${catName.toLowerCase().replace(/\s+/g, '-')}`,
        nombre: catName,
        slug: catName.toLowerCase(),
      });
    });

    return dynamicCats;
  }

  return [...INITIAL_CATEGORIES];
}

/**
 * Ponderación relativa de tallas textiles estándar para ordenamiento natural.
 * Esto NO restringe las tallas: cualquier talla que no esté aquí (ej. '40', '42', 'Única', '0-3M')
 * se muestra y se ordena de forma natural sin ser descartada ni filtrada.
 */
const TEXTILE_SIZE_RANKS: Record<string, number> = {
  '4XS': 1,
  '3XS': 2,
  'XXXS': 2,
  '2XS': 3,
  'XXS': 3,
  'XS': 4,
  'S': 5,
  'M': 6,
  'L': 7,
  'XL': 8,
  '1XL': 8,
  '2XL': 9,
  'XXL': 9,
  '3XL': 10,
  'XXXL': 10,
  '4XL': 11,
  '5XL': 12,
};

export function sortSizes(sizes: string[]): string[] {
  return [...sizes].sort((a, b) => {
    const cleanA = (a || '').trim();
    const cleanB = (b || '').trim();
    const upperA = cleanA.toUpperCase();
    const upperB = cleanB.toUpperCase();

    // 1. Si ambas son tallas textiles estándar
    const rankA = TEXTILE_SIZE_RANKS[upperA];
    const rankB = TEXTILE_SIZE_RANKS[upperB];
    if (rankA !== undefined && rankB !== undefined) {
      return rankA - rankB;
    }

    // 2. Si ambas son numéricas (ej. 28, 30, 32, 34, 36, 38, 40, 42)
    const numA = Number(cleanA);
    const numB = Number(cleanB);
    const isNumA = !isNaN(numA) && cleanA !== '';
    const isNumB = !isNaN(numB) && cleanB !== '';

    if (isNumA && isNumB) {
      return numA - numB;
    }

    // 3. Tallas textiles estándar antes que números
    if (rankA !== undefined && isNumB) return -1;
    if (isNumA && rankB !== undefined) return 1;

    // 4. Tallas textiles estándar antes que texto libre (ej. 'Única')
    if (rankA !== undefined && !isNumB) return -1;
    if (!isNumA && rankB !== undefined) return 1;

    // 5. Números antes que texto libre
    if (isNumA && !isNumB) return -1;
    if (!isNumA && isNumB) return 1;

    // 6. Orden natural sensible al idioma para cualquier otro formato (ej. 'Única', 'Standard', 'Infantil')
    return cleanA.localeCompare(cleanB, 'es', { numeric: true, sensitivity: 'base' });
  });
}

/**
 * Extrae dinámicamente las tallas únicas disponibles para una categoría específica
 * o para todo el catálogo si la categoría es 'todos' o indefinida.
 * 
 * COMPLETAMENTE DINÁMICA: No existe lista cerrada de tallas.
 * Cualquier talla que exista en `producto.tallas` (letras, números, palabras como 'Única')
 * se detecta y se agrega automáticamente al filtro.
 */
export function extractAvailableSizes(
  products: Product[],
  categoria?: string
): string[] {
  const matchingProducts = products.filter((product) => {
    if (categoria && categoria.toLowerCase() !== 'todos') {
      return product.categoria.toLowerCase() === categoria.toLowerCase();
    }
    return true;
  });

  const sizeSet = new Set<string>();
  matchingProducts.forEach((product) => {
    if (Array.isArray(product.tallas)) {
      product.tallas.forEach((talla) => {
        const cleanTalla = typeof talla === 'string' ? talla.trim() : String(talla).trim();
        if (cleanTalla) {
          sizeSet.add(cleanTalla);
        }
      });
    }
  });

  return sortSizes(Array.from(sizeSet));
}

/**
 * Filtra y busca productos según criterios:
 * - Nombre de prenda
 * - Categoría
 * - Talla (dinámica y dependiente de la categoría)
 * - Color
 * - Disponibilidad (stock > 0 y estado === 'activo')
 */
export function filterAndSearchProducts(
  products: Product[],
  options: ProductFilterOptions
): Product[] {
  return products.filter((product) => {
    // 1. Filtro por categoría (si no es 'todos' o está vacío)
    if (options.categoria && options.categoria.toLowerCase() !== 'todos') {
      const catMatch = product.categoria.toLowerCase() === options.categoria.toLowerCase();
      if (!catMatch) return false;
    }

    // 2. Filtro por talla (si no es 'todas' o está vacío)
    if (
      options.talla &&
      options.talla.trim() !== '' &&
      options.talla.toLowerCase() !== 'todas'
    ) {
      const targetSize = options.talla.trim().toLowerCase();
      const hasSize = product.tallas.some(
        (t) => (t !== undefined && t !== null ? String(t).trim().toLowerCase() : '') === targetSize
      );
      if (!hasSize) return false;
    }

    // 3. Filtro por búsqueda (nombre, categoría, color, descripción, código)
    if (options.busqueda && options.busqueda.trim() !== '') {
      const term = options.busqueda.trim().toLowerCase();
      const matchName = product.nombre.toLowerCase().includes(term);
      const matchCat = product.categoria.toLowerCase().includes(term);
      const matchColor = product.color.toLowerCase().includes(term);
      const matchDesc = product.descripcion.toLowerCase().includes(term);
      const matchTallas = product.tallas.some((t) => t.toLowerCase().includes(term));
      const matchRef = product.codigoReferencia?.toLowerCase().includes(term);

      if (!matchName && !matchCat && !matchColor && !matchDesc && !matchTallas && !matchRef) {
        return false;
      }
    }

    // 4. Filtro por solo disponibles si se solicita
    if (options.soloDisponibles) {
      if (product.stock <= 0 || product.estado === 'agotado') {
        return false;
      }
    }

    return true;
  });
}
