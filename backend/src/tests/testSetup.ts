/**
 * @summary
 * Global test setup configuration
 * Configures Jest test environment
 */

import { closePool } from '@/instances/database';

/**
 * @summary
 * Cleanup after all tests
 */
afterAll(async () => {
  await closePool();
});
