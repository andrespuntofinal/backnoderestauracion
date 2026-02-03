import { Router } from 'express';
import { TransactionController } from '../controllers';
import { authMiddleware, rbacMiddleware } from '../middlewares';

export const transactionRoutes = Router();
const transactionController = new TransactionController();

/**
 * GET /api/transactions
 * Obtener todas las transacciones
 */
transactionRoutes.get(
  '/',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => transactionController.getAll(req, res)
);

/**
 * GET /api/transactions/stats/summary
 * Obtener resumen de estadísticas (ANTES que :id para evitar conflicto)
 */
transactionRoutes.get(
  '/stats/summary',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => transactionController.getStatsSummary(req, res)
);

/**
 * GET /api/transactions/stats/by-category
 * Obtener estadísticas por categoría
 */
transactionRoutes.get(
  '/stats/by-category',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => transactionController.getStatsByCategory(req, res)
);

/**
 * GET /api/transactions/:id
 * Obtener transacción por ID
 */
transactionRoutes.get(
  '/:id',
  authMiddleware,
  (req, res) => transactionController.getById(req, res)
);

/**
 * GET /api/transactions/category/:categoryId
 * Obtener transacciones por categoría
 */
transactionRoutes.get(
  '/category/:categoryId',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => transactionController.getByCategory(req, res)
);

/**
 * GET /api/transactions/person/:personId
 * Obtener transacciones por persona
 */
transactionRoutes.get(
  '/person/:personId',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => transactionController.getByPerson(req, res)
);

/**
 * GET /api/transactions/range/:startDate/:endDate
 * Obtener transacciones por rango de fechas
 */
transactionRoutes.get(
  '/range/:startDate/:endDate',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => transactionController.getByDateRange(req, res)
);

/**
 * POST /api/transactions
 * Crear nueva transacción
 */
transactionRoutes.post(
  '/',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => transactionController.create(req, res)
);

/**
 * PUT /api/transactions/:id
 * Actualizar transacción
 */
transactionRoutes.put(
  '/:id',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => transactionController.update(req, res)
);

/**
 * DELETE /api/transactions/:id
 * Eliminar transacción
 */
transactionRoutes.delete(
  '/:id',
  authMiddleware,
  rbacMiddleware('Transacciones'),
  (req, res) => transactionController.delete(req, res)
);