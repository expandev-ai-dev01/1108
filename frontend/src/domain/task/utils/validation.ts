/**
 * @utility validation
 * @summary Client-side validation utilities for task data
 * @domain task
 * @type utility-function
 * @category validation
 */

import { z } from 'zod';
import { parse, isBefore, startOfDay } from 'date-fns';

export const taskValidationSchema = z.object({
  titulo: z
    .string()
    .min(3, 'O título deve ter pelo menos 3 caracteres')
    .max(100, 'O título não pode exceder 100 caracteres')
    .refine((val) => val.trim().length > 0, 'O título não pode conter apenas espaços em branco'),
  descricao: z.string().max(500, 'A descrição não pode exceder 500 caracteres').optional(),
  data_vencimento: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'A data de vencimento deve estar no formato DD/MM/AAAA')
    .refine((val) => {
      const date = parse(val, 'dd/MM/yyyy', new Date());
      return !isNaN(date.getTime());
    }, 'Data de vencimento inválida')
    .refine((val) => {
      const date = parse(val, 'dd/MM/yyyy', new Date());
      const today = startOfDay(new Date());
      return !isBefore(date, today);
    }, 'A data de vencimento não pode ser anterior à data atual'),
  prioridade: z.enum(['Baixa', 'Média', 'Alta'], {
    errorMap: () => ({ message: 'A prioridade deve ser Baixa, Média ou Alta' }),
  }),
});

export type TaskValidationSchema = z.infer<typeof taskValidationSchema>;
