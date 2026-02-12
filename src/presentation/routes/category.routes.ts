import { Router } from 'express';
import { CategoryController } from '../controllers';
import { authMiddleware, rbacMiddleware } from '../middlewares';

export const categoryRoutes = Router();
const categoryController = new CategoryController();

/**
 * GET /api/categories
 * Obtener todas las categorías
 */
categoryRoutes.get(
  '/',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => categoryController.getAll(req, res)
);

/**
 * GET /api/categories/stats/usage
 * Obtener estadísticas de uso (ANTES que :id para evitar conflicto)
 */
categoryRoutes.get(
  '/stats/usage',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => categoryController.getUsageStats(req, res)
);

/**
 * GET /api/categories/:id
 * Obtener categoría por ID
 */
categoryRoutes.get(
  '/:id',
  authMiddleware,
  (req, res) => categoryController.getById(req, res)
);

/**
 * GET /api/categories/type/:type
 * Obtener categorías por tipo (Ingreso/Gasto)
 */
categoryRoutes.get(
  '/type/:type',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => categoryController.getByType(req, res)
);

/**
 * POST /api/categories
 * Crear nueva categoría
 */
categoryRoutes.post(
  '/',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => categoryController.create(req, res)
);

/**
 * PUT /api/categories/:id
 * Actualizar categoría
 */
categoryRoutes.put(
  '/:id',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => categoryController.update(req, res)
);

/**
 * DELETE /api/categories/:id
 * Eliminar categoría
 */
categoryRoutes.delete(
  '/:id',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => categoryController.delete(req, res)
);