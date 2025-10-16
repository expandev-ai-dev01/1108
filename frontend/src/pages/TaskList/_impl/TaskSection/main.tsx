/**
 * @component TaskSection
 * @summary Section component for displaying a list of tasks with loading state
 * @domain task
 * @type display-component
 * @category display
 *
 * @props
 * @param {string} props.title - Section title
 * @param {Task[]} props.tasks - Array of tasks to display
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.emptyMessage - Message when no tasks
 */

import { LoadingSpinner } from '@/core/components';
import { TaskCard } from '../TaskCard';
import type { TaskSectionProps } from './types';

export const TaskSection = ({ title, tasks, isLoading, emptyMessage }: TaskSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">{title}</h2>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="large" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-gray-600">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task.id_tarefa} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};
