import { Request, Response, NextFunction } from 'express';
import { CrudController, errorResponse, successResponse } from '@/middleware/crud';
import { taskCreate, taskListPending, taskListExpired } from '@/services/task';
import { taskCreateSchema } from '@/services/task/taskValidation';

/**
 * @api {post} /api/v1/internal/task Create Task
 * @apiName CreateTask
 * @apiGroup Task
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new task with title, description, due date, and priority
 *
 * @apiParam {String} titulo Task title (3-100 characters, required)
 * @apiParam {String} [descricao] Task description (max 500 characters, optional)
 * @apiParam {String} data_vencimento Due date in DD/MM/YYYY format (required)
 * @apiParam {String} prioridade Priority level: 'Baixa', 'Média', or 'Alta' (required)
 *
 * @apiSuccess {String} id_tarefa Generated task identifier (UUID v4)
 * @apiSuccess {String} titulo Task title
 * @apiSuccess {String} descricao Task description
 * @apiSuccess {String} data_vencimento Due date
 * @apiSuccess {String} prioridade Task priority
 * @apiSuccess {Date} data_criacao Creation timestamp
 * @apiSuccess {String} status Task status ('Pendente' or 'Vencida')
 *
 * @apiError {String} tituloVazio Title is required
 * @apiError {String} tituloMuitoCurto Title must have at least 3 characters
 * @apiError {String} tituloMuitoLongo Title cannot exceed 100 characters
 * @apiError {String} tituloApenasEspacos Title cannot contain only whitespace
 * @apiError {String} descricaoMuitoLonga Description cannot exceed 500 characters
 * @apiError {String} dataVencimentoInvalida Invalid due date format
 * @apiError {String} dataVencimentoPassado Due date cannot be in the past
 * @apiError {String} prioridadeInvalida Priority must be 'Baixa', 'Média', or 'Alta'
 * @apiError {String} tituloDuplicado Task with this title already exists
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const securable = 'TASK';
  const operation = new CrudController([{ securable, permission: 'CREATE' }]);

  /**
   * @validation Request validation with Zod schema
   * @throws {ValidationError}
   */
  const [validated, error] = await operation.create(req, taskCreateSchema);

  if (!validated) {
    return next(error);
  }

  /**
   * @rule {fn-task-creation} Execute task creation business logic
   */
  try {
    const data = await taskCreate({
      titulo: validated.params.titulo,
      descricao: validated.params.descricao,
      data_vencimento: validated.params.data_vencimento,
      prioridade: validated.params.prioridade,
    });

    res.status(201).json(successResponse(data));
  } catch (error: any) {
    if (error.message === 'tituloDuplicado') {
      res.status(400).json(errorResponse('Já existe uma tarefa com este título'));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /api/v1/internal/task/pending Get Pending Tasks
 * @apiName GetPendingTasks
 * @apiGroup Task
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves all pending tasks (not expired, not completed)
 *
 * @apiSuccess {Object[]} tasks Array of pending tasks
 * @apiSuccess {String} tasks.id_tarefa Task identifier
 * @apiSuccess {String} tasks.titulo Task title
 * @apiSuccess {String} tasks.descricao Task description
 * @apiSuccess {String} tasks.data_vencimento Due date
 * @apiSuccess {String} tasks.prioridade Task priority
 * @apiSuccess {Date} tasks.data_criacao Creation timestamp
 * @apiSuccess {String} tasks.status Task status
 */
export async function getPendingHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await taskListPending();
    res.json(successResponse(data));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {get} /api/v1/internal/task/expired Get Expired Tasks
 * @apiName GetExpiredTasks
 * @apiGroup Task
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves all expired tasks
 *
 * @apiSuccess {Object[]} tasks Array of expired tasks
 * @apiSuccess {String} tasks.id_tarefa Task identifier
 * @apiSuccess {String} tasks.titulo Task title
 * @apiSuccess {String} tasks.descricao Task description
 * @apiSuccess {String} tasks.data_vencimento Due date
 * @apiSuccess {String} tasks.prioridade Task priority
 * @apiSuccess {Date} tasks.data_criacao Creation timestamp
 * @apiSuccess {String} tasks.status Task status
 */
export async function getExpiredHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await taskListExpired();
    res.json(successResponse(data));
  } catch (error: any) {
    next(error);
  }
}
