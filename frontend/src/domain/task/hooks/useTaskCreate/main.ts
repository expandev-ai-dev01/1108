/**
 * @hook useTaskCreate
 * @summary Hook for creating new tasks with mutation handling
 * @domain task
 * @type domain-hook
 * @category data
 *
 * @dependencies
 * - @tanstack/react-query: Mutation management
 * - taskService: API calls
 *
 * @parameters
 * @param {UseTaskCreateOptions} options - Hook configuration
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 *
 * @returns {UseTaskCreateReturn} Hook return object
 * @returns {Function} returns.createTask - Function to create task
 * @returns {boolean} returns.isCreating - Loading state
 * @returns {Error|null} returns.error - Error state
 *
 * @examples
 * ```tsx
 * const { createTask, isCreating } = useTaskCreate({
 *   onSuccess: (task) => console.log('Created:', task),
 *   onError: (error) => console.error('Error:', error)
 * });
 *
 * await createTask({
 *   titulo: 'Nova tarefa',
 *   data_vencimento: '25/12/2024',
 *   prioridade: 'Alta'
 * });
 * ```
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../../services';
import type { UseTaskCreateOptions, UseTaskCreateReturn } from './types';

export const useTaskCreate = (options: UseTaskCreateOptions = {}): UseTaskCreateReturn => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options;

  const mutation = useMutation({
    mutationFn: taskService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', 'pending'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', 'expired'] });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return {
    createTask: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
  };
};
