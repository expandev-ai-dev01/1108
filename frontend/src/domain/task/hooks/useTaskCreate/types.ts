/**
 * @module task/hooks/useTaskCreate/types
 * @summary Type definitions for useTaskCreate hook
 * @domain task
 * @category hooks
 */

import type { Task, CreateTaskDto } from '../../types';

export type UseTaskCreateOptions = {
  onSuccess?: (task: Task) => void;
  onError?: (error: Error) => void;
};

export type UseTaskCreateReturn = {
  createTask: (data: CreateTaskDto) => Promise<Task>;
  isCreating: boolean;
  error: Error | null;
};
