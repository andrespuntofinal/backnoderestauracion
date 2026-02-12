import { Router } from 'express';
import { UserController } from '../controllers';
import { authMiddleware, rbacMiddleware } from '../middlewares';

export const userRoutes = Router();
const userController = new UserController();

/**
 * GET /api/users
 * Obtener todos los usuarios (Admin y usuarios con permiso)
 */
userRoutes.get(
  '/',
  authMiddleware,
  rbacMiddleware('Usuarios'),
  (req, res) => userController.getAll(req, res)
);

/**
 * GET /api/users/email/:email
 */
userRoutes.get(
  '/email/:email',
  authMiddleware,
  (req, res) => userController.getByEmail(req, res)
);

/**
 * GET /api/users/:id
 */
userRoutes.get(
  '/:id',
  authMiddleware,
  (req, res) => userController.getById(req, res)
);



/**
 * POST /api/users
 * Crear usuario (Solo admin)
 */
userRoutes.post(
  '/',
  authMiddleware,
  rbacMiddleware('Usuarios'),
  (req, res) => userController.create(req, res)
);

/**
 * PUT /api/users/:id
 * Actualizar usuario (Solo admin)
 */
userRoutes.put(
  '/:id',
  authMiddleware,
  rbacMiddleware('Usuarios'),
  (req, res) => userController.update(req, res)
);

/**
 * DELETE /api/users/:id
 * Eliminar usuario (Solo admin)
 */
userRoutes.delete(
  '/:id',
  authMiddleware,
  rbacMiddleware('Usuarios'),
  (req, res) => userController.delete(req, res)
);