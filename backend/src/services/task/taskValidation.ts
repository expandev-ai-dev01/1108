import { z } from 'zod';
import { TaskPriority } from '@/services/task/taskTypes';

/**
 * @summary
 * Task validation schemas and functions
 * Provides validation logic for task operations
 */

/**
 * @summary
 * Validates task title format
 * Ensures title is not only whitespace
 *
 * @param {string} titulo - Task title to validate
 * @returns {boolean} True if valid
 * @throws {Error} If title contains only whitespace
 */
export function validateTitleFormat(titulo: string): boolean {
  const trimmed = titulo.trim();
  if (trimmed.length === 0) {
    throw new Error('tituloApenasEspacos');
  }
  return true;
}

/**
 * @summary
 * Validates date format DD/MM/YYYY
 *
 * @param {string} data - Date string to validate
 * @returns {boolean} True if valid format
 * @throws {Error} If format is invalid
 */
export function validateDateFormat(data: string): boolean {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(data)) {
    throw new Error('dataVencimentoInvalida');
  }
  return true;
}

/**
 * @summary
 * Converts DD/MM/YYYY to Date object
 *
 * @param {string} dateString - Date in DD/MM/YYYY format
 * @returns {Date} Parsed date object
 */
export function parseDateDDMMYYYY(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * @summary
 * Validates that due date is not in the past
 *
 * @param {string} data_vencimento - Due date in DD/MM/YYYY format
 * @returns {boolean} True if valid
 * @throws {Error} If date is in the past
 */
export function validateDueDateNotPast(data_vencimento: string): boolean {
  const dueDate = parseDateDDMMYYYY(data_vencimento);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  if (dueDate < today) {
    throw new Error('dataVencimentoPassado');
  }
  return true;
}

/**
 * @summary
 * Checks if due date is in the past (for status update)
 *
 * @param {string} data_vencimento - Due date in DD/MM/YYYY format
 * @returns {boolean} True if date is in the past
 */
export function isDueDatePast(data_vencimento: string): boolean {
  const dueDate = parseDateDDMMYYYY(data_vencimento);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  return dueDate < today;
}

/**
 * @summary
 * Task creation validation schema
 */
export const taskCreateSchema = z.object({
  titulo: z
    .string()
    .min(3, 'tituloMuitoCurto')
    .max(100, 'tituloMuitoLongo')
    .refine((val) => val.trim().length > 0, {
      message: 'tituloApenasEspacos',
    }),
  descricao: z.string().max(500, 'descricaoMuitoLonga').optional().default(''),
  data_vencimento: z
    .string()
    .refine((val) => validateDateFormat(val), {
      message: 'dataVencimentoInvalida',
    })
    .refine((val) => validateDueDateNotPast(val), {
      message: 'dataVencimentoPassado',
    }),
  prioridade: z.nativeEnum(TaskPriority, {
    errorMap: () => ({ message: 'prioridadeInvalida' }),
  }),
});
