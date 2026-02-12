import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface Environment {
  port: number;
  mongodbUrl: string;
  secretKey: string;
  firebaseProjectId: string;
  apiRateLimitWindowMs: number;
  apiRateLimitMax: number;
  corsOrigin: string;
}

const getEnvironment = (): Environment => {
  const port = parseInt(process.env.PORT || '3001', 10);
  const mongodbUrl = process.env.MONGODB_CNN;
  const secretKey = process.env.SECRETPRIVATEKEY;
  const firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
  const apiRateLimitWindowMs = parseInt(process.env.API_RATE_LIMIT_WINDOW_MS || '60000', 10);
  const apiRateLimitMax = parseInt(process.env.API_RATE_LIMIT_MAX || '100', 10);
  const corsOrigin = process.env.CORS_ORIGIN || '*';

  // Validaciones críticas
  if (!mongodbUrl) {
    throw new Error('❌ MONGODB_CNN no está definida en .env');
  }
  if (!secretKey) {
    throw new Error('❌ SECRETPRIVATEKEY no está definida en .env');
  }
  if (!firebaseProjectId) {
    throw new Error('❌ FIREBASE_PROJECT_ID no está definida en .env');
  }

  return {
    port,
    mongodbUrl,
    secretKey,
    firebaseProjectId,
    apiRateLimitWindowMs,
    apiRateLimitMax,
    corsOrigin,
  };
};

export const env = getEnvironment();