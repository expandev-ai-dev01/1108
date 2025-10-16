/**
 * @module pages/TaskList/_impl/TaskSection/types
 * @summary Type definitions for TaskSection component
 * @domain task
 * @category components
 */

import type { Task } from '@/domain/task/types';

export type TaskSectionProps = {
  title: string;
  tasks: Task[];
  isLoading: boolean;
  emptyMessage: string;
};
