import { Router } from 'express';
import externalRoutes from '@/routes/v1/externalRoutes';
import internalRoutes from '@/routes/v1/internalRoutes';

const router = Router();

/**
 * @summary
 * V1 API router
 * Separates external (public) and internal (authenticated) routes
 */

/**
 * @summary
 * External (public) routes
 * @route /api/v1/external
 */
router.use('/external', externalRoutes);

/**
 * @summary
 * Internal (authenticated) routes
 * @route /api/v1/internal
 */
router.use('/internal', internalRoutes);

export default router;
