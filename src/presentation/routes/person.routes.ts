import { Router } from 'express';
import { PersonController } from '../controllers';
import { authMiddleware, rbacMiddleware } from '../middlewares';

export const personRoutes = Router();
const personController = new PersonController();

/**
 * GET /api/persons
 */
personRoutes.get(
  '/',
  authMiddleware,
  rbacMiddleware('Personas'),
  (req, res) => personController.getAll(req, res)
);

/**
 * GET /api/persons/:id
 */
personRoutes.get(
  '/:id',
  authMiddleware,
  (req, res) => personController.getById(req, res)
);

/**
 * GET /api/persons/identification/:identification
 */
personRoutes.get(
  '/identification/:identification',
  authMiddleware,
  (req, res) => personController.getByIdentification(req, res)
);

/**
 * POST /api/persons
 */
personRoutes.post(
  '/',
  authMiddleware,
  rbacMiddleware('Personas'),
  (req, res) => personController.create(req, res)
);

/**
 * PUT /api/persons/:id
 */
personRoutes.put(
  '/:id',
  authMiddleware,
  rbacMiddleware('Personas'),
  (req, res) => personController.update(req, res)
);

/**
 * DELETE /api/persons/:id
 */
personRoutes.delete(
  '/:id',
  authMiddleware,
  rbacMiddleware('Personas'),
  (req, res) => personController.delete(req, res)
);

/**
 * GET /api/persons/ministry/:ministryId
 */
personRoutes.get(
  '/ministry/:ministryId',
  authMiddleware,
  (req, res) => personController.getByMinistry(req, res)
);