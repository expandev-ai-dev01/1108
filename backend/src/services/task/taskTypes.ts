/**
 * @summary
 * Task service type definitions
 * Defines interfaces and enums for task management
 */

/**
 * @enum TaskStatus
 * @description Task status enumeration
 */
export enum TaskStatus {
  Pendente = 'Pendente',
  Concluida = 'Concluída',
  Vencida = 'Vencida',
}

/**
 * @enum TaskPriority
 * @description Task priority enumeration
 */
export enum TaskPriority {
  Baixa = 'Baixa',
  Media = 'Média',
  Alta = 'Alta',
}

/**
 * @interface TaskEntity
 * @description Represents a task entity in the system
 *
 * @property {string} id_tarefa - Unique task identifier (UUID v4)
 * @property {string} titulo - Task title
 * @property {string} descricao - Task description (optional)
 * @property {string} data_vencimento - Due date in DD/MM/YYYY format
 * @property {TaskPriority} prioridade - Task priority level
 * @property {Date} data_criacao - Creation timestamp
 * @property {TaskStatus} status - Current task status
 */
export interface TaskEntity {
  id_tarefa: string;
  titulo: string;
  descricao: string;
  data_vencimento: string;
  prioridade: TaskPriority;
  data_criacao: Date;
  status: TaskStatus;
}

/**
 * @interface TaskCreateRequest
 * @description Request parameters for creating a new task
 *
 * @property {string} titulo - Task title (3-100 characters)
 * @property {string} descricao - Task description (optional, max 500 characters)
 * @property {string} data_vencimento - Due date in DD/MM/YYYY format
 * @property {TaskPriority} prioridade - Task priority level
 */
export interface TaskCreateRequest {
  titulo: string;
  descricao?: string;
  data_vencimento: string;
  prioridade: TaskPriority;
}

/**
 * @interface TaskCreateResponse
 * @description Response after successful task creation
 *
 * @property {string} id_tarefa - Generated task identifier
 * @property {string} titulo - Task title
 * @property {string} descricao - Task description
 * @property {string} data_vencimento - Due date
 * @property {TaskPriority} prioridade - Task priority
 * @property {Date} data_criacao - Creation timestamp
 * @property {TaskStatus} status - Initial task status
 */
export interface TaskCreateResponse {
  id_tarefa: string;
  titulo: string;
  descricao: string;
  data_vencimento: string;
  prioridade: TaskPriority;
  data_criacao: Date;
  status: TaskStatus;
}
