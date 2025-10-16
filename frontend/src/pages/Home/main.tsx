/**
 * @page HomePage
 * @summary Welcome page for the TODO List application with navigation to tasks
 * @domain core
 * @type landing-page
 * @category public
 */

import { useNavigate } from 'react-router-dom';
import { Button } from '@/core/components';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Sistema de TO DO List</h1>
        <p className="mb-6 text-lg text-gray-600">
          Bem-vindo ao sistema de gerenciamento de tarefas. Organize suas atividades de forma
          simples e eficiente.
        </p>
        <div className="mb-6 space-y-4">
          <div className="rounded-md bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-900">Funcionalidades</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-blue-800">
              <li>Criar tarefas com título, descrição, data de vencimento e prioridade</li>
              <li>Visualizar tarefas pendentes e vencidas separadamente</li>
              <li>Validação automática de dados e datas</li>
              <li>Interface intuitiva e responsiva</li>
            </ul>
          </div>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/tasks')} size="large">
            Ver Minhas Tarefas
          </Button>
          <Button onClick={() => navigate('/tasks/create')} variant="outline" size="large">
            Criar Nova Tarefa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
