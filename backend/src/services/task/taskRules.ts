import { v4 as uuidv4 } from 'uuid';
import {
  TaskEntity,
  TaskCreateRequest,
  TaskCreateResponse,
  TaskStatus,
  TaskPriority,
} from '@/services/task/taskTypes';
import { isDueDatePast } from '@/services/task/taskValidation';

/**
 * @summary
 * In-memory task storage
 * Tasks are stored per session in memory
 */
const taskStorage: Map<string, TaskEntity> = new Map();

/**
 * @summary
 * Creates a new task with validation and business rules
 *
 * @function taskCreate
 * @module task
 *
 * @param {TaskCreateRequest} params - Task creation parameters
 * @param {string} params.titulo - Task title (3-100 characters)
 * @param {string} params.descricao - Task description (optional, max 500 characters)
 * @param {string} params.data_vencimento - Due date in DD/MM/YYYY format
 * @param {TaskPriority} params.prioridade - Task priority level
 *
 * @returns {Promise<TaskCreateResponse>} Created task entity
 *
 * @throws {Error} When title is duplicated
 * @throws {Error} When validation fails
 *
 * @example
 * const task = await taskCreate({
 *   titulo: 'Complete project documentation',
 *   descricao: 'Write comprehensive API documentation',
 *   data_vencimento: '31/12/2024',
 *   prioridade: TaskPriority.Alta
 * });
 */
export async function taskCreate(params: TaskCreateRequest): Promise<TaskCreateResponse> {
  /**
   * @validation Check for duplicate title
   * @throws {Error} tituloDuplicado
   */
  const existingTask = Array.from(taskStorage.values()).find(
    (task) => task.titulo.toLowerCase() === params.titulo.toLowerCase()
  );

  if (existingTask) {
    throw new Error('tituloDuplicado');
  }

  /**
   * @rule {fn-task-creation} Generate unique task identifier
   */
  const id_tarefa = uuidv4();

  /**
   * @rule {fn-task-creation} Set creation timestamp
   */
  const data_criacao = new Date();

  /**
   * @rule {fn-task-creation} Determine initial status based on due date
   */
  const status = isDueDatePast(params.data_vencimento) ? TaskStatus.Vencida : TaskStatus.Pendente;

  /**
   * @rule {fn-task-creation} Create task entity
   */
  const newTask: TaskEntity = {
    id_tarefa,
    titulo: params.titulo.trim(),
    descricao: params.descricao?.trim() || '',
    data_vencimento: params.data_vencimento,
    prioridade: params.prioridade,
    data_criacao,
    status,
  };

  /**
   * @rule {fn-task-creation} Store task in memory
   */
  taskStorage.set(id_tarefa, newTask);

  return {
    id_tarefa: newTask.id_tarefa,
    titulo: newTask.titulo,
    descricao: newTask.descricao,
    data_vencimento: newTask.data_vencimento,
    prioridade: newTask.prioridade,
    data_criacao: newTask.data_criacao,
    status: newTask.status,
  };
}

/**
 * @summary
 * Retrieves all tasks and updates expired task statuses
 *
 * @function taskList
 * @module task
 *
 * @returns {Promise<TaskEntity[]>} Array of all tasks with updated statuses
 *
 * @example
 * const tasks = await taskList();
 */
export async function taskList(): Promise<TaskEntity[]> {
  /**
   * @rule {fn-task-status-update} Update expired task statuses
   */
  taskStorage.forEach((task) => {
    if (task.status !== TaskStatus.Concluida && isDueDatePast(task.data_vencimento)) {
      task.status = TaskStatus.Vencida;
    }
  });

  return Array.from(taskStorage.values());
}

/**
 * @summary
 * Retrieves pending tasks (not expired, not completed)
 *
 * @function taskListPending
 * @module task
 *
 * @returns {Promise<TaskEntity[]>} Array of pending tasks
 *
 * @example
 * const pendingTasks = await taskListPending();
 */
export async function taskListPending(): Promise<TaskEntity[]> {
  await taskList();
  return Array.from(taskStorage.values())
    .filter((task) => task.status === TaskStatus.Pendente)
    .sort((a, b) => b.data_criacao.getTime() - a.data_criacao.getTime());
}

/**
 * @summary
 * Retrieves expired tasks
 *
 * @function taskListExpired
 * @module task
 *
 * @returns {Promise<TaskEntity[]>} Array of expired tasks
 *
 * @example
 * const expiredTasks = await taskListExpired();
 */
export async function taskListExpired(): Promise<TaskEntity[]> {
  await taskList();
  return Array.from(taskStorage.values()).filter((task) => task.status === TaskStatus.Vencida);
}

/**
 * @summary
 * Clears all tasks from memory (for testing purposes)
 *
 * @function taskClearAll
 * @module task
 */
export function taskClearAll(): void {
  taskStorage.clear();
}
