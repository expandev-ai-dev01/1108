/**
 * @page HomePage
 * @summary Welcome page for the TODO List application
 * @domain core
 * @type landing-page
 * @category public
 */
export const HomePage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Sistema de TO DO List</h1>
        <p className="mb-6 text-lg text-gray-600">
          Bem-vindo ao sistema de gerenciamento de tarefas.
        </p>
        <div className="rounded-md bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            A estrutura base do frontend foi criada com sucesso. As funcionalidades de gerenciamento
            de tarefas serão implementadas em breve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
