import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { env } from './config';
import { userRoutes, personRoutes, ministryRoutes, transactionRoutes } from './presentation/routes';

export const app: Express = express();

// Middlewares globales
app.use(cors({
  origin: env.corsOrigin,
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Middleware de logging
app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ==================== RUTAS ====================

/**
 * Ruta de salud
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Servidor ComunidadPro funcionando correctamente',
    timestamp: new Date().toISOString(),
  });
});

/**
 * API Routes (protegidas con autenticación)
 */
app.use('/api/users', userRoutes);
app.use('/api/persons', personRoutes);
app.use('/api/ministries', ministryRoutes);
app.use('/api/transactions', transactionRoutes);

// ==================== MANEJO DE ERRORES ====================

/**
 * Rutas no encontradas
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    path: req.path,
    method: req.method,
  });
});

/**
 * Manejador global de errores
 */
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error no controlado:', error.message);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
});