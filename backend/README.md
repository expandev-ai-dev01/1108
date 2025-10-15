# TODO List Backend API

Backend REST API for TODO List system built with Node.js, Express, TypeScript, and SQL Server.

## Features

- RESTful API architecture
- TypeScript for type safety
- Express.js framework
- SQL Server database integration
- API versioning support
- Comprehensive error handling
- Request validation with Zod
- CORS configuration
- Security middleware (Helmet)
- Compression middleware

## Prerequisites

- Node.js 18+ 
- SQL Server 2019+
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials and settings

## Development

Start development server with hot reload:
```bash
npm run dev
```

## Building

Build for production:
```bash
npm run build
```

## Production

Start production server:
```bash
npm start
```

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Linting

Run ESLint:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

## Project Structure

```
src/
├── api/                    # API controllers
│   └── v1/                 # API version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   └── v1/                 # Version 1 routes
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── instances/              # Service instances
├── constants/              # Application constants
├── config/                 # Configuration
├── tests/                  # Global test utilities
└── server.ts               # Application entry point
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### API Version 1
Base URL: `/api/v1`

#### External (Public)
- Routes will be added as features are implemented

#### Internal (Authenticated)
- Routes will be added as features are implemented

## Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 3000 |
| API_VERSION | API version | v1 |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 1433 |
| DB_USER | Database user | sa |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | todolist |
| DB_ENCRYPT | Enable encryption | true |
| CORS_ORIGINS | Allowed CORS origins | localhost:3000,localhost:3001,localhost:5173 |
| BCRYPT_ROUNDS | Bcrypt hash rounds | 10 |
| CACHE_TTL | Cache TTL in seconds | 3600 |
| CACHE_CHECK_PERIOD | Cache check period | 600 |

## Architecture

### Multi-Tenancy
The system implements account-based data isolation ensuring complete separation between different organizational accounts.

### API Versioning
URL path versioning strategy allows API evolution without breaking existing clients.

### Error Handling
Standardized error responses with appropriate HTTP status codes and descriptive messages.

### Validation
Request validation using Zod schemas ensures data integrity and type safety.

## Contributing

1. Follow the established code structure and naming conventions
2. Write tests for new features
3. Update documentation as needed
4. Follow TypeScript and ESLint standards

## License

ISC