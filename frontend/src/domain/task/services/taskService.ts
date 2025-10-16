/**
 * @service taskService
 * @summary Task management service for authenticated endpoints
 * @domain task
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/task/...
 *
 * Authentication token is automatically added by interceptor.
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Task, CreateTaskDto, TaskAPIResponse } from '../types';

export const taskService = {
  /**
   * @endpoint POST /api/v1/internal/task
   * @summary Creates new task
   */
  async create(data: CreateTaskDto): Promise<Task> {
    const response = await authenticatedClient.post<TaskAPIResponse>('/task', data);
    return response.data.data as Task;
  },

  /**
   * @endpoint GET /api/v1/internal/task/pending
   * @summary Fetches list of pending tasks
   */
  async listPending(): Promise<Task[]> {
    const response = await authenticatedClient.get<TaskAPIResponse>('/task/pending');
    return response.data.data as Task[];
  },

  /**
   * @endpoint GET /api/v1/internal/task/expired
   * @summary Fetches list of expired tasks
   */
  async listExpired(): Promise<Task[]> {
    const response = await authenticatedClient.get<TaskAPIResponse>('/task/expired');
    return response.data.data as Task[];
  },
};
