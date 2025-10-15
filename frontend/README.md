# Sistema de TO DO List - Frontend

## Visão Geral

Frontend do sistema de gerenciamento de tarefas (TO DO List) construído com React, TypeScript e TailwindCSS.

## Tecnologias

- **React 18.3.1** - Biblioteca UI
- **TypeScript 5.6.3** - Tipagem estática
- **Vite 5.4.11** - Build tool e dev server
- **TailwindCSS 3.4.14** - Framework CSS utilitário
- **React Router DOM 6.26.2** - Roteamento
- **TanStack Query 5.59.20** - Gerenciamento de estado do servidor
- **Axios 1.7.7** - Cliente HTTP
- **React Hook Form 7.53.1** - Gerenciamento de formulários
- **Zod 3.23.8** - Validação de schemas

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Componente raiz
│   ├── providers.tsx      # Providers globais
│   └── router.tsx         # Configuração de rotas
├── core/                   # Componentes e utilitários compartilhados
│   ├── components/        # Componentes UI genéricos
│   ├── lib/              # Configurações de bibliotecas
│   └── utils/            # Funções utilitárias
├── domain/                # Domínios de negócio (a serem implementados)
├── pages/                 # Páginas da aplicação
│   ├── layouts/          # Layouts compartilhados
│   ├── Home/             # Página inicial
│   └── NotFound/         # Página 404
└── assets/               # Recursos estáticos
    └── styles/           # Estilos globais
```

## Configuração

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis de ambiente
# Edite o arquivo .env com as configurações do backend
```

### Variáveis de Ambiente

```env
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## Integração com Backend

O frontend está configurado para se comunicar com o backend através de dois clientes HTTP:

- **publicClient**: Para endpoints públicos (`/api/v1/external`)
- **authenticatedClient**: Para endpoints autenticados (`/api/v1/internal`)

A configuração está em `src/core/lib/api.ts`.

## Próximos Passos

1. Implementar domínio de tarefas (`src/domain/task`)
2. Criar páginas de gerenciamento de tarefas
3. Implementar formulários de criação/edição
4. Adicionar listagens de tarefas pendentes e vencidas
5. Implementar autenticação (se necessário)

## Padrões de Código

- Componentes em PascalCase
- Hooks customizados com prefixo `use`
- Arquivos de tipos em `types.ts`
- Estilos com TailwindCSS
- Validação com Zod
- Gerenciamento de estado do servidor com TanStack Query

## Licença

Proprietary