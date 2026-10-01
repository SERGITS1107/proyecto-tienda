/**
 * Configuración e inicialización de Firebase para Milagritos: MODA Y ESTILO.
 * Conexión modular con Firebase App y Cloud Firestore.
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Parámetros de configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'milagritos-moda-y-estilo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'milagritos-moda-y-estilo',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'milagritos-moda-y-estilo.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

let app: FirebaseApp;
let db: Firestore;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn('Advertencia en inicialización de Firebase:', error);
  // Inicialización de respaldo para evitar romper el contexto
  app = {} as FirebaseApp;
  db = {} as Firestore;
}

export { app, db, firebaseConfig };
