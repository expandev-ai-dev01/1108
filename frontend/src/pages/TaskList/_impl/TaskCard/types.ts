/**
 * @module pages/TaskList/_impl/TaskCard/types
 * @summary Type definitions for TaskCard component
 * @domain task
 * @category components
 */

import type { Task } from '@/domain/task/types';

export type TaskCardProps = {
  task: Task;
};
