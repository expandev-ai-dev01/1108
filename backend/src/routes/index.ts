import { Router } from 'express';
import v1Routes from '@/routes/v1';

const router = Router();

/**
 * @summary
 * Main API router with version management
 *
 * @route /api
 * @description Routes API requests to appropriate version handlers
 */

/**
 * @summary
 * Version 1 routes (current stable)
 * @route /api/v1
 */
router.use('/v1', v1Routes);

/**
 * @summary
 * Future versions can be added here
 * @example
 * router.use('/v2', v2Routes);
 */

export default router;
