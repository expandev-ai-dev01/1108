/**
 * @hook useTaskList
 * @summary Hook for fetching task lists (pending or expired)
 * @domain task
 * @type domain-hook
 * @category data
 *
 * @dependencies
 * - @tanstack/react-query: Query management
 * - taskService: API calls
 *
 * @parameters
 * @param {UseTaskListOptions} options - Hook configuration
 * @param {TaskListType} options.type - Type of list ('pending' or 'expired')
 * @param {boolean} options.enabled - Enable/disable query
 *
 * @returns {UseTaskListReturn} Hook return object
 * @returns {Task[]} returns.tasks - List of tasks
 * @returns {boolean} returns.isLoading - Loading state
 * @returns {Error|null} returns.error - Error state
 * @returns {Function} returns.refetch - Refetch function
 *
 * @examples
 * ```tsx
 * const { tasks, isLoading } = useTaskList({ type: 'pending' });
 * const { tasks: expiredTasks } = useTaskList({ type: 'expired' });
 * ```
 */

import { useQuery } from '@tanstack/react-query';
import { taskService } from '../../services';
import type { UseTaskListOptions, UseTaskListReturn } from './types';

export const useTaskList = (options: UseTaskListOptions): UseTaskListReturn => {
  const { type, enabled = true } = options;

  const queryFn = type === 'pending' ? taskService.listPending : taskService.listExpired;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['tasks', type],
    queryFn,
    enabled,
    staleTime: 2 * 60 * 1000,
  });

  return {
    tasks: data || [],
    isLoading,
    error,
    refetch,
  };
};
