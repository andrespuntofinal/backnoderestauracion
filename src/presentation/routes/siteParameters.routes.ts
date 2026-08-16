import { Router } from 'express';
import { SiteParametersController } from '../controllers';
import { authMiddleware, rbacMiddleware } from '../middlewares';

export const siteParametersRoutes = Router();
const controller = new SiteParametersController();

/**
 * GET /api/site-params (Público para Landing y App)
 */
siteParametersRoutes.get(
  '/',
  (req, res) => controller.getParams(req, res)
);

/**
 * PATCH /api/site-params (Requiere auth y permiso Parámetros sitio / Admin)
 */
siteParametersRoutes.patch(
  '/',
  authMiddleware,
  rbacMiddleware('Parámetros sitio'),
  (req, res) => controller.updateParams(req, res)
);

/**
 * PUT /api/site-params (Alias para PATCH)
 */
siteParametersRoutes.put(
  '/',
  authMiddleware,
  rbacMiddleware('Parámetros sitio'),
  (req, res) => controller.updateParams(req, res)
);
