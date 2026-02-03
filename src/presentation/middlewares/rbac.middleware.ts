import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { UnauthorizedError } from '../../application';
import { Container } from '../../infrastructure';

/**
 * Middleware de Control de Acceso Basado en Roles (RBAC)
 * Verifica si el usuario tiene permiso para acceder a un módulo
 */
export const rbacMiddleware = (requiredPermission: string) => {
  return async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('Usuario no autenticado');
      }

      // Obtener repositorio del contenedor de DI
      const container = Container.getInstance();
      const userRepository = container.getUserRepository();
      const user = await userRepository.findByEmail(req.user.email);

      // Si no existe en MongoDB, denegar acceso
      if (!user) {
        throw new UnauthorizedError(
          'Usuario no autorizado en el sistema. Contacte al administrador.'
        );
      }

      // Verificar permiso: Admin tiene acceso a todo
      if (user.isAdmin()) {
        return next();
      }

      // Verificar si tiene el permiso específico
      if (!user.hasPermission(requiredPermission)) {
        throw new UnauthorizedError(
          `No tienes permiso para acceder a '${requiredPermission}'`
        );
      }

      // Adjuntar usuario del dominio al request
      (req as any).domainUser = user;
      next();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        res.status(403).json({
          success: false,
          error: error.message,
          code: 'FORBIDDEN',
        });
        return;
      }

      console.error('❌ Error en rbacMiddleware:', error);
      res.status(500).json({
        success: false,
        error: 'Error al verificar permisos',
      });
    }
  };
};