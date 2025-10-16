/**
 * @module task/hooks/useTaskList/types
 * @summary Type definitions for useTaskList hook
 * @domain task
 * @category hooks
 */

import type { Task } from '../../types';

export type TaskListType = 'pending' | 'expired';

export type UseTaskListOptions = {
  type: TaskListType;
  enabled?: boolean;
};

export type UseTaskListReturn = {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};
