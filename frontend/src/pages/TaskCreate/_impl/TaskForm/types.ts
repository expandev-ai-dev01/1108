/**
 * @module pages/TaskCreate/_impl/TaskForm/types
 * @summary Type definitions for TaskForm component
 * @domain task
 * @category components
 */

import type { CreateTaskDto } from '@/domain/task/types';

export type TaskFormProps = {
  onSubmit: (data: CreateTaskDto) => void;
  isSubmitting: boolean;
};
