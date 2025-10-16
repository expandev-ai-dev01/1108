/**
 * @module task
 * @summary Task management domain with creation, listing, and validation
 * @domain functional
 * @dependencies @tanstack/react-query, react-hook-form, zod, date-fns
 * @version 1.0.0
 * @author Development Team
 * @lastModified 2024-01-15
 */

export * from './types';
export * from './services';
export * from './hooks';
export * from './utils';

export const moduleMetadata = {
  name: 'task',
  domain: 'functional',
  version: '1.0.0',
  publicHooks: ['useTaskCreate', 'useTaskList'],
  publicServices: ['taskService'],
  dependencies: {
    internal: ['@/core/lib/api'],
    external: ['@tanstack/react-query', 'axios', 'zod', 'date-fns'],
    domains: [],
  },
  exports: {
    hooks: ['useTaskCreate', 'useTaskList'],
    services: ['taskService'],
    types: ['Task', 'CreateTaskDto', 'TaskPriority', 'TaskStatus'],
    utils: ['taskValidationSchema'],
  },
} as const;
