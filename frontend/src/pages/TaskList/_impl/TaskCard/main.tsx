/**
 * @component TaskCard
 * @summary Card component for displaying individual task information
 * @domain task
 * @type display-component
 * @category display
 *
 * @props
 * @param {Task} props.task - Task data to display
 *
 * @styling
 * - Priority colors: Baixa (green), Média (yellow), Alta (red)
 * - Status badges with appropriate colors
 * - Responsive card layout
 */

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { TaskCardProps } from './types';

export const TaskCard = ({ task }: TaskCardProps) => {
  const priorityColors = {
    Baixa: 'bg-green-100 text-green-800',
    Média: 'bg-yellow-100 text-yellow-800',
    Alta: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    Pendente: 'bg-blue-100 text-blue-800',
    Concluída: 'bg-green-100 text-green-800',
    Vencida: 'bg-red-100 text-red-800',
  };

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{task.titulo}</h3>
        <div className="flex gap-2">
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              priorityColors[task.prioridade]
            }`}
          >
            {task.prioridade}
          </span>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[task.status]}`}
          >
            {task.status}
          </span>
        </div>
      </div>

      {task.descricao && <p className="mb-3 text-sm text-gray-600">{task.descricao}</p>}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div>
          <span className="font-medium">Vencimento:</span> {task.data_vencimento}
        </div>
        <div>
          <span className="font-medium">Criada em:</span> {formatDate(task.data_criacao)}
        </div>
      </div>
    </div>
  );
};
