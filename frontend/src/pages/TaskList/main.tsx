/**
 * @page TaskListPage
 * @summary Page displaying pending and expired tasks in separate sections
 * @domain task
 * @type list-page
 * @category task-management
 *
 * @routing
 * - Path: /tasks
 * - Guards: None (public for now)
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Header, Pending Tasks, Expired Tasks
 *
 * @data
 * - Sources: Task API (pending and expired endpoints)
 * - Loading: Skeleton loading states per section
 * - Caching: 2 minutes stale time
 *
 * @userFlows
 * - Primary: View tasks -> Create new task
 * - Secondary: Refresh lists -> View task details
 */

import { useNavigate } from 'react-router-dom';
import { useTaskList } from '@/domain/task/hooks';
import { Button } from '@/core/components';
import { TaskSection } from './_impl';

export const TaskListPage = () => {
  const navigate = useNavigate();

  const {
    tasks: pendingTasks,
    isLoading: isLoadingPending,
    refetch: refetchPending,
  } = useTaskList({ type: 'pending' });

  const {
    tasks: expiredTasks,
    isLoading: isLoadingExpired,
    refetch: refetchExpired,
  } = useTaskList({ type: 'expired' });

  const handleRefresh = () => {
    refetchPending();
    refetchExpired();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Minhas Tarefas</h1>
            <p className="mt-2 text-gray-600">Gerencie suas tarefas pendentes e vencidas</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleRefresh}>
              Atualizar
            </Button>
            <Button onClick={() => navigate('/tasks/create')}>Nova Tarefa</Button>
          </div>
        </div>

        <TaskSection
          title="Tarefas Pendentes"
          tasks={pendingTasks}
          isLoading={isLoadingPending}
          emptyMessage="Nenhuma tarefa pendente no momento"
        />

        <TaskSection
          title="Tarefas Vencidas"
          tasks={expiredTasks}
          isLoading={isLoadingExpired}
          emptyMessage="Nenhuma tarefa vencida"
        />
      </div>
    </div>
  );
};

export default TaskListPage;
