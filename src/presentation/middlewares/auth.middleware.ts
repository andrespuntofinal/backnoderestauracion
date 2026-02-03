import { Request, Response, NextFunction } from 'express';
import { FirebaseConfig } from '../../config';
import { UnauthorizedError } from '../../application';

/**
 * Interfaz extendida de Request para incluir usuario autenticado
 */
export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
    name?: string;
  };
}

/**
 * Middleware de autenticación Firebase
 * Valida el token JWT y extrae la información del usuario
 */
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token no proporcionado');
    }

    const token = authHeader.substring(7); // Remover "Bearer "

    // Verificar token con Firebase
    const firebaseAuth = FirebaseConfig.getAuth();
    const decodedToken = await firebaseAuth.verifyIdToken(token);

    // Adjuntar información del usuario al request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      name: decodedToken.name,
    };

    next();
  } catch (error) {
    console.error('❌ Error en authMiddleware:', error);
    res.status(401).json({
      error: 'Token inválido o expirado',
      code: 'UNAUTHORIZED',
    });
  }
};