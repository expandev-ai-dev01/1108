import { Router } from 'express';
import * as taskController from '@/api/v1/internal/task/controller';

const router = Router();

/**
 * @summary
 * Internal (authenticated) API routes
 * These routes require authentication
 *
 * @route /api/v1/internal
 */

/**
 * @summary
 * Task management routes
 */
router.post('/task', taskController.postHandler);
router.get('/task/pending', taskController.getPendingHandler);
router.get('/task/expired', taskController.getExpiredHandler);

export default router;
