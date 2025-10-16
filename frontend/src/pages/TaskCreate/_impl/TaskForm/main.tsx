/**
 * @component TaskForm
 * @summary Form component for creating new tasks with validation
 * @domain task
 * @type form-component
 * @category form
 *
 * @props
 * @param {Function} props.onSubmit - Callback when form is submitted
 * @param {boolean} props.isSubmitting - Loading state during submission
 *
 * @validation
 * - Client-side validation with Zod schema
 * - Real-time error feedback
 * - Format validation for date (DD/MM/YYYY)
 * - Business rule validation (date not in past)
 *
 * @examples
 * ```tsx
 * <TaskForm
 *   onSubmit={handleSubmit}
 *   isSubmitting={isCreating}
 * />
 * ```
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button } from '@/core/components';
import { taskValidationSchema } from '@/domain/task/utils';
import type { TaskFormProps } from './types';
import type { CreateTaskDto } from '@/domain/task/types';

export const TaskForm = ({ onSubmit, isSubmitting }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskDto>({
    resolver: zodResolver(taskValidationSchema),
    defaultValues: {
      prioridade: 'Média',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Título"
        {...register('titulo')}
        error={errors.titulo?.message}
        required
        placeholder="Digite o título da tarefa"
        disabled={isSubmitting}
      />

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          {...register('descricao')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          rows={4}
          placeholder="Digite a descrição da tarefa (opcional)"
          disabled={isSubmitting}
        />
        {errors.descricao && (
          <p className="mt-1 text-sm text-red-600">{errors.descricao.message}</p>
        )}
      </div>

      <Input
        label="Data de Vencimento"
        {...register('data_vencimento')}
        error={errors.data_vencimento?.message}
        required
        placeholder="DD/MM/AAAA"
        disabled={isSubmitting}
      />

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Prioridade <span className="ml-1 text-red-600">*</span>
        </label>
        <select
          {...register('prioridade')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
        >
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
        {errors.prioridade && (
          <p className="mt-1 text-sm text-red-600">{errors.prioridade.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'Criando...' : 'Criar Tarefa'}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => window.history.back()}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};
