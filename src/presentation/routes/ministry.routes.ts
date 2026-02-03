import { Router } from 'express';
import { MinistryController } from '../controllers';
import { authMiddleware, rbacMiddleware } from '../middlewares';

export const ministryRoutes = Router();
const ministryController = new MinistryController();

/**
 * GET /api/ministries
 */
ministryRoutes.get(
  '/',
  authMiddleware,
  rbacMiddleware('Ministerios'),
  (req, res) => ministryController.getAll(req, res)
);

/**
 * GET /api/ministries/:id
 */
ministryRoutes.get(
  '/:id',
  authMiddleware,
  (req, res) => ministryController.getById(req, res)
);

/**
 * POST /api/ministries
 */
ministryRoutes.post(
  '/',
  authMiddleware,
  rbacMiddleware('Ministerios'),
  (req, res) => ministryController.create(req, res)
);

/**
 * PUT /api/ministries/:id
 */
ministryRoutes.put(
  '/:id',
  authMiddleware,
  rbacMiddleware('Ministerios'),
  (req, res) => ministryController.update(req, res)
);

/**
 * DELETE /api/ministries/:id
 */
ministryRoutes.delete(
  '/:id',
  authMiddleware,
  rbacMiddleware('Ministerios'),
  (req, res) => ministryController.delete(req, res)
);