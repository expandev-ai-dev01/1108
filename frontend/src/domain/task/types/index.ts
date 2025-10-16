/**
 * @module task/types
 * @summary Type definitions for task domain
 * @domain task
 * @category types
 */

export type TaskPriority = 'Baixa' | 'Média' | 'Alta';
export type TaskStatus = 'Pendente' | 'Concluída' | 'Vencida';

export type Task = {
  id_tarefa: string;
  titulo: string;
  descricao?: string;
  data_vencimento: string;
  prioridade: TaskPriority;
  data_criacao: string;
  status: TaskStatus;
};

export type CreateTaskDto = {
  titulo: string;
  descricao?: string;
  data_vencimento: string;
  prioridade: TaskPriority;
};

export type TaskListParams = {
  status?: TaskStatus;
};

export type TaskAPIResponse = {
  data: Task | Task[];
  message?: string;
};
