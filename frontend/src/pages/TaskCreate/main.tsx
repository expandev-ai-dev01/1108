/**
 * @page TaskCreatePage
 * @summary Page for creating new tasks with form validation and feedback
 * @domain task
 * @type form-page
 * @category task-management
 *
 * @routing
 * - Path: /tasks/create
 * - Guards: None (public for now)
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Header, Form
 *
 * @data
 * - Sources: Task API
 * - Loading: Form submission state
 * - Caching: Invalidates task lists on success
 *
 * @userFlows
 * - Primary: Fill form -> Submit -> Success message -> Redirect to list
 * - Error: Show validation errors -> Allow correction -> Retry
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskCreate } from '@/domain/task/hooks';
import { TaskForm } from './_impl';
import type { CreateTaskDto } from '@/domain/task/types';

export const TaskCreatePage = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { createTask, isCreating } = useTaskCreate({
    onSuccess: (task) => {
      setSuccessMessage(`Tarefa "${task.titulo}" criada com sucesso!`);
      setErrorMessage(null);
      setTimeout(() => {
        navigate('/tasks');
      }, 2000);
    },
    onError: (error) => {
      if (error.message.includes('título')) {
        setErrorMessage('Já existe uma tarefa com este título');
      } else {
        setErrorMessage('Erro ao criar tarefa. Por favor, tente novamente.');
      }
      setSuccessMessage(null);
    },
  });

  const handleSubmit = async (data: CreateTaskDto) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    await createTask(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Criar Nova Tarefa</h1>
          <p className="mt-2 text-gray-600">Preencha os campos abaixo para criar uma nova tarefa</p>
        </div>

        {successMessage && (
          <div className="mb-6 rounded-md bg-green-50 p-4">
            <p className="text-sm text-green-800">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{errorMessage}</p>
          </div>
        )}

        <div className="rounded-lg bg-white p-6 shadow">
          <TaskForm onSubmit={handleSubmit} isSubmitting={isCreating} />
        </div>
      </div>
    </div>
  );
};

export default TaskCreatePage;
