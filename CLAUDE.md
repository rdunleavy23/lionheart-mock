# CLAUDE.md - AI Assistant Guide for lionheart-mock

This document provides essential context and guidelines for AI assistants working on the lionheart-mock codebase.

## Project Overview

**Project Name:** lionheart-mock
**Repository:** rdunleavy23/lionheart-mock
**Status:** In Development
**Last Updated:** 2025-12-01

### Purpose

A TypeScript-based mock API server for testing and development purposes. This project provides a configurable mock implementation that can be used to simulate external services, test integrations, or support local development without requiring live API access.

### Technology Stack

- **Runtime:** Node.js (LTS version, currently v20+)
- **Language:** TypeScript 5.x
- **Package Manager:** npm or pnpm (pnpm preferred for speed and efficiency)
- **Web Framework:** Express.js or Fastify (for high-performance mock APIs)
- **Testing Framework:** Vitest (modern, fast, ESM-first) or Jest
- **Code Quality:** ESLint + Prettier
- **Type Checking:** TypeScript strict mode
- **HTTP Client Testing:** Supertest
- **Environment Management:** dotenv
- **Development Tools:** tsx (for running TypeScript directly), nodemon (for auto-reload)

## Repository Structure

```
lionheart-mock/
├── src/
│   ├── server.ts              # Main server entry point
│   ├── app.ts                 # Express/Fastify app configuration
│   ├── routes/                # API route handlers
│   │   ├── index.ts           # Route aggregator
│   │   └── *.routes.ts        # Individual route modules
│   ├── middleware/            # Custom middleware
│   │   ├── errorHandler.ts   # Global error handling
│   │   ├── logger.ts          # Request logging
│   │   └── validation.ts      # Request validation
│   ├── controllers/           # Request handlers / business logic
│   ├── services/              # Service layer (business logic)
│   ├── models/                # Data models and types
│   ├── mocks/                 # Mock data and fixtures
│   │   ├── data/              # JSON mock data files
│   │   └── generators/        # Data generation utilities
│   ├── config/                # Configuration management
│   │   └── index.ts           # Centralized config
│   └── utils/                 # Utility functions and helpers
├── tests/
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── fixtures/              # Test fixtures and helpers
├── scripts/                   # Build and utility scripts
│   ├── dev.sh                 # Development startup script
│   └── seed-data.ts           # Data seeding script
├── .github/
│   └── workflows/             # GitHub Actions CI/CD
│       └── ci.yml             # Main CI workflow
├── dist/                      # Compiled JavaScript (gitignored)
├── node_modules/              # Dependencies (gitignored)
├── .env.example               # Example environment variables
├── .env                       # Local environment (gitignored)
├── .gitignore                 # Git ignore rules
├── .eslintrc.json             # ESLint configuration
├── .prettierrc                # Prettier configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Project metadata and scripts
├── pnpm-lock.yaml             # Dependency lock file (if using pnpm)
├── vitest.config.ts           # Vitest configuration
├── README.md                  # Project documentation
└── CLAUDE.md                  # This file
```

## Development Setup

### Prerequisites

- **Node.js:** v20.x or later (LTS recommended)
- **Package Manager:** pnpm (install via `npm install -g pnpm`) or npm
- **Git:** For version control
- **VS Code:** Recommended editor with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd lionheart-mock

# Install dependencies
pnpm install  # or: npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env with your local settings

# Run in development mode
pnpm dev  # or: npm run dev

# Run tests
pnpm test  # or: npm test

# Build for production
pnpm build  # or: npm run build
```

### Available Scripts

```bash
pnpm dev          # Start development server with hot-reload
pnpm build        # Compile TypeScript to JavaScript
pnpm start        # Run production build
pnpm test         # Run all tests
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage report
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors automatically
pnpm format       # Format code with Prettier
pnpm type-check   # Run TypeScript type checking
```

## Development Workflow

### Branching Strategy

- **Main branch:** `main` - production-ready code
- **Feature branches:** `feature/descriptive-name` (e.g., `feature/add-location-endpoint`)
- **Bug fix branches:** `fix/issue-description` (e.g., `fix/cors-headers`)
- **AI-generated branches:** `claude/*` prefix (automatically created)

### Git Workflow

1. Create a new branch from `main` for each feature/fix
2. Make changes and test locally
3. Run linting and tests before committing
4. Commit with clear, conventional commit messages
5. Push to remote branch
6. Create pull request for review

### Commit Message Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (deps, config, etc.)
- `perf`: Performance improvements

**Examples:**

```
feat(api): add location mock endpoint

- Add GET /api/locations/:id endpoint
- Include mock data for Arvada CO location
- Add request validation middleware

Closes #123
```

```
fix(cors): resolve CORS header configuration

Update CORS middleware to allow localhost:3000 origin
```

## Code Style & Conventions

### General Principles

- **Type Safety First:** Leverage TypeScript's type system; avoid `any`
- **Functional Preferred:** Use functional programming patterns where appropriate
- **Immutability:** Prefer `const` over `let`, avoid mutating objects
- **Async/Await:** Use async/await instead of raw Promises or callbacks
- **Error Handling:** Always handle errors; use custom error classes
- **Single Responsibility:** Each function/class should have one clear purpose

### TypeScript Conventions

```typescript
// ✅ Good: Explicit types, immutable, clear naming
interface LocationResponse {
  id: string;
  name: string;
  address: Address;
  coordinates: Coordinates;
}

const getLocationById = async (id: string): Promise<LocationResponse> => {
  const location = await locationService.findById(id);
  if (!location) {
    throw new NotFoundError(`Location ${id} not found`);
  }
  return location;
};

// ❌ Bad: No types, mutable, unclear
let getLocation = (id) => {
  var location = locationService.findById(id);
  return location;
};
```

### Naming Conventions

- **Variables & Functions:** `camelCase`
- **Classes & Interfaces:** `PascalCase`
- **Constants:** `UPPER_SNAKE_CASE` (for true constants only)
- **Files:** `kebab-case.ts` or `camelCase.ts` (be consistent)
- **Type/Interface files:** `*.types.ts` or `*.interface.ts`
- **Test files:** `*.test.ts` or `*.spec.ts`

**Examples:**
```typescript
const MAX_RETRIES = 3;                    // Constant
const getUserProfile = async () => {};     // Function
class LocationService {}                   // Class
interface LocationData {}                  // Interface
type RequestHandler = () => void;          // Type alias
```

### File Organization

- **One export per file** (for classes/main exports)
- **Group related functionality** together
- **Barrel exports:** Use `index.ts` files to re-export from directories
- **Separate concerns:** Keep routes, controllers, services, and models in separate files

```typescript
// routes/locations.routes.ts - Route definitions only
// controllers/locations.controller.ts - Request/response handling
// services/locations.service.ts - Business logic
// models/location.types.ts - Type definitions
```

### Import Order

1. Node.js built-in modules
2. External dependencies
3. Internal absolute imports
4. Internal relative imports
5. Type imports (if separated)

```typescript
import { readFile } from 'fs/promises';        // Node built-in
import express from 'express';                 // External
import { config } from '@/config';             // Internal absolute
import { LocationService } from './service';   // Internal relative
import type { Location } from '@/types';       // Types
```

## Testing Strategy

### Testing Philosophy

- **Test behavior, not implementation:** Focus on what the code does, not how
- **Meaningful coverage:** Aim for high coverage on critical paths
- **Fast and isolated:** Tests should run quickly and independently
- **Realistic mocks:** Mock data should resemble production data

### Test Structure

```typescript
// tests/unit/services/location.service.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LocationService } from '@/services/location.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    service = new LocationService();
  });

  describe('getLocationById', () => {
    it('should return location when found', async () => {
      const location = await service.getLocationById('arvada-co');

      expect(location).toBeDefined();
      expect(location.id).toBe('arvada-co');
    });

    it('should throw NotFoundError when location not found', async () => {
      await expect(
        service.getLocationById('nonexistent')
      ).rejects.toThrow('Location not found');
    });
  });
});
```

### Test Coverage Goals

- **Critical paths:** 90%+ coverage
- **Business logic:** 80%+ coverage
- **Overall:** 70%+ coverage
- **Focus areas:** Services, controllers, utilities

### Running Tests

```bash
# Run all tests
pnpm test

# Watch mode (re-run on file changes)
pnpm test:watch

# Coverage report
pnpm test:coverage

# Run specific test file
pnpm test location.service.test.ts

# Run tests matching pattern
pnpm test --grep "LocationService"
```

## Build & Deployment

### Build Process

```bash
# Development build (with source maps)
pnpm build

# Production build (optimized)
NODE_ENV=production pnpm build

# Type checking only (no emit)
pnpm type-check
```

The build process:
1. Cleans the `dist/` directory
2. Runs TypeScript compiler (`tsc`)
3. Copies non-TS files (JSON, etc.) to `dist/`
4. Validates output

### Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# API Configuration
API_PREFIX=/api
API_VERSION=v1

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:5173

# Logging
LOG_LEVEL=debug

# Mock Data
MOCK_DELAY_MS=100
ENABLE_RANDOM_ERRORS=false
ERROR_RATE=0.1
```

**Environment-specific settings:**

- **Development:** Verbose logging, hot-reload, mock delays disabled
- **Test:** Silent logging, fast execution, deterministic behavior
- **Production:** Info-level logging, optimized build, no mocks

### Deployment

**Local/Development:**
```bash
pnpm dev
```

**Production (Docker):**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

**Production (Node.js):**
```bash
pnpm build
NODE_ENV=production node dist/server.js
```

### CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`):

1. **Lint:** Run ESLint on all code
2. **Type Check:** Verify TypeScript types
3. **Test:** Run test suite with coverage
4. **Build:** Compile TypeScript
5. **Deploy:** (Optional) Deploy to staging/production

## Dependencies & Third-Party Libraries

### Core Dependencies

```json
{
  "express": "^4.18.x",           // Web framework (or "fastify")
  "zod": "^3.22.x",               // Runtime validation
  "dotenv": "^16.3.x",            // Environment variables
  "helmet": "^7.1.x",             // Security headers
  "cors": "^2.8.x",               // CORS middleware
  "compression": "^1.7.x"         // Response compression
}
```

### Development Dependencies

```json
{
  "typescript": "^5.3.x",         // TypeScript compiler
  "vitest": "^1.0.x",             // Test framework
  "tsx": "^4.7.x",                // TypeScript execution
  "eslint": "^8.56.x",            // Linting
  "prettier": "^3.1.x",           // Code formatting
  "@types/node": "^20.x.x",       // Node.js types
  "@types/express": "^4.17.x",    // Express types
  "supertest": "^6.3.x"           // HTTP testing
}
```

### Dependency Management

- **Updates:** Review and update monthly using `pnpm update` or `npm-check-updates`
- **Security:** Run `pnpm audit` or `npm audit` regularly
- **Lock files:** Always commit `pnpm-lock.yaml` or `package-lock.json`
- **No direct edits:** Never modify lock files manually

## Architecture & Design Patterns

### Architectural Overview

**Pattern:** Layered Architecture (MVC-like)

```
┌─────────────────────────────────────────┐
│           Routes (API Layer)            │  ← HTTP routing
├─────────────────────────────────────────┤
│        Controllers (Handler Layer)      │  ← Request/Response handling
├─────────────────────────────────────────┤
│         Services (Business Logic)       │  ← Core logic, data access
├─────────────────────────────────────────┤
│      Models/Types (Data Structures)     │  ← Data models, interfaces
└─────────────────────────────────────────┘
```

**Request Flow:**
1. Client → Route → Middleware (validation, auth)
2. Middleware → Controller (parse request)
3. Controller → Service (business logic)
4. Service → Mock Data / External API
5. Response ← Controller ← Service
6. Response → Client

### Key Design Decisions

1. **Decision:** Use TypeScript with strict mode enabled
   - **Rationale:** Catch errors at compile time, improve code quality, better IDE support
   - **Date:** 2025-12-01

2. **Decision:** Layered architecture with clear separation of concerns
   - **Rationale:** Easier testing, maintainability, and scalability
   - **Date:** 2025-12-01

3. **Decision:** Vitest over Jest
   - **Rationale:** Faster execution, better ESM support, modern API, Vite compatibility
   - **Date:** 2025-12-01

4. **Decision:** Use Zod for runtime validation
   - **Rationale:** Type-safe validation, great TypeScript integration, clear error messages
   - **Date:** 2025-12-01

### Design Patterns Used

- **Dependency Injection:** Pass dependencies via constructors
- **Factory Pattern:** For creating mock data
- **Repository Pattern:** Abstract data access
- **Middleware Pattern:** Express/Fastify middleware chain
- **Error Handling Pattern:** Centralized error handler

## API Documentation

### API Structure

**Base URL:** `http://localhost:3000/api/v1`

**Common Headers:**
```
Content-Type: application/json
Accept: application/json
```

### Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { /* response payload */ },
  "meta": {
    "timestamp": "2025-12-01T12:00:00Z",
    "version": "v1"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "details": { /* optional additional info */ }
  },
  "meta": {
    "timestamp": "2025-12-01T12:00:00Z",
    "version": "v1"
  }
}
```

### Status Codes

- `200 OK` - Successful GET, PUT, PATCH
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Authenticated but not authorized
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

### Example Endpoints

```typescript
// GET /api/v1/locations
// GET /api/v1/locations/:id
// POST /api/v1/locations
// PUT /api/v1/locations/:id
// DELETE /api/v1/locations/:id
```

## Mock Data Strategy

### Mock Data Organization

```typescript
// src/mocks/data/locations.json
[
  {
    "id": "arvada-co",
    "name": "Arvada, CO",
    "address": {
      "street": "123 Main St",
      "city": "Arvada",
      "state": "CO",
      "zip": "80002"
    },
    "coordinates": {
      "lat": 39.8028,
      "lng": -105.0875
    }
  }
]
```

### Mock Data Generators

```typescript
// src/mocks/generators/location.generator.ts
import { faker } from '@faker-js/faker';
import type { Location } from '@/models/location.types';

export const generateLocation = (overrides?: Partial<Location>): Location => {
  return {
    id: faker.string.uuid(),
    name: faker.location.city(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zip: faker.location.zipCode()
    },
    coordinates: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude()
    },
    ...overrides
  };
};
```

### Configuration Options

- **Response Delays:** Simulate network latency (configurable via env)
- **Random Errors:** Randomly return errors to test error handling
- **Data Variation:** Use seed values for deterministic mock data
- **Pagination:** Mock paginated responses for large datasets

## Security Best Practices

### Security Checklist

- ✅ **Helmet.js:** Security headers configured
- ✅ **CORS:** Properly configured allowed origins
- ✅ **Input Validation:** Validate all inputs with Zod
- ✅ **Environment Variables:** Never commit `.env` files
- ✅ **Dependencies:** Regular security audits (`pnpm audit`)
- ✅ **Rate Limiting:** Implement for production (express-rate-limit)
- ✅ **HTTPS:** Use HTTPS in production
- ✅ **Error Messages:** Don't expose stack traces in production

### Security Considerations

**Environment Variables:**
```typescript
// ❌ Bad: Hardcoded secrets
const apiKey = 'sk_live_123456789';

// ✅ Good: Environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) throw new Error('API_KEY is required');
```

**Input Validation:**
```typescript
// ✅ Always validate with Zod
const LocationSchema = z.object({
  name: z.string().min(1).max(100),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string().length(2),
    zip: z.string().regex(/^\d{5}$/)
  })
});

const location = LocationSchema.parse(req.body);
```

**Error Handling:**
```typescript
// ❌ Bad: Exposes internals
res.status(500).json({ error: error.stack });

// ✅ Good: Generic message in production
const message = process.env.NODE_ENV === 'production'
  ? 'Internal server error'
  : error.message;
res.status(500).json({ error: { message } });
```

## Common Tasks for AI Assistants

### Adding a New API Endpoint

1. **Define types** in `src/models/*.types.ts`
2. **Create route** in `src/routes/*.routes.ts`
3. **Add controller** in `src/controllers/*.controller.ts`
4. **Implement service** in `src/services/*.service.ts`
5. **Add mock data** in `src/mocks/data/*.json`
6. **Write tests** in `tests/integration/`
7. **Update documentation** (this file, README, API docs)
8. **Commit changes** with conventional commit message

### Fixing a Bug

1. **Reproduce the bug:** Write a failing test first
2. **Identify root cause:** Debug and trace the issue
3. **Implement fix:** Make minimal necessary changes
4. **Verify fix:** Ensure test passes
5. **Check for regressions:** Run full test suite
6. **Document if needed:** Update comments or docs if behavior changed
7. **Commit with fix:** Use `fix:` commit type

### Refactoring Code

1. **Ensure tests exist:** Write tests if missing
2. **Make incremental changes:** Small, focused commits
3. **Run tests frequently:** After each small change
4. **Update types:** Keep TypeScript types accurate
5. **Update imports:** Fix any broken import paths
6. **Review for side effects:** Check all usages
7. **Document changes:** Update relevant documentation

### Adding Dependencies

```bash
# Add production dependency
pnpm add package-name

# Add development dependency
pnpm add -D package-name

# Add with specific version
pnpm add package-name@1.2.3
```

**After adding:**
1. Update relevant imports in code
2. Add types if needed (`@types/package-name`)
3. Document why it's needed in commit message
4. Update this CLAUDE.md if it's a core dependency

## Performance Optimization

### Performance Best Practices

- **Compression:** Enable gzip/brotli compression
- **Caching:** Cache responses where appropriate
- **Async Operations:** Use async/await, avoid blocking
- **Database Queries:** Use indexes, limit results
- **Payload Size:** Keep responses lean, use pagination
- **Connection Pooling:** Reuse connections

### Monitoring

```typescript
// Add request timing middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
  });
  next();
});
```

## Common Pitfalls & Gotchas

### TypeScript Gotchas

❌ **Using `any` type:**
```typescript
const data: any = await fetchData(); // Loses type safety
```

✅ **Use proper types:**
```typescript
const data: LocationData = await fetchData();
```

❌ **Ignoring null/undefined:**
```typescript
const name = location.name.toUpperCase(); // Could crash
```

✅ **Check for null:**
```typescript
const name = location?.name?.toUpperCase() ?? 'Unknown';
```

### Async/Await Gotchas

❌ **Forgetting await:**
```typescript
const data = fetchData(); // Returns Promise, not data!
```

✅ **Always await:**
```typescript
const data = await fetchData();
```

❌ **Unhandled promise rejections:**
```typescript
await riskyOperation(); // Could throw
```

✅ **Wrap in try/catch:**
```typescript
try {
  await riskyOperation();
} catch (error) {
  handleError(error);
}
```

### Express/Fastify Gotchas

❌ **Not sending response:**
```typescript
app.get('/test', (req, res) => {
  const data = getData();
  // Forgot res.json(data)!
});
```

✅ **Always respond:**
```typescript
app.get('/test', (req, res) => {
  const data = getData();
  res.json({ success: true, data });
});
```

## Resources & References

### Official Documentation

- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Vitest Documentation](https://vitest.dev/guide/)
- [Zod Documentation](https://zod.dev/)

### Best Practices & Style Guides

- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [REST API Best Practices](https://restfulapi.net/)

### Tools & Utilities

- [TypeScript Playground](https://www.typescriptlang.org/play)
- [npm trends](https://npmtrends.com/) - Compare package popularity
- [Bundlephobia](https://bundlephobia.com/) - Check package sizes
- [Can I Use](https://node.green/) - Node.js feature compatibility

### Team Contacts

- **Project Owner:** rdunleavy23
- **Repository:** https://github.com/rdunleavy23/lionheart-mock

## FAQ for AI Assistants

**Q: Should I use Express or Fastify?**
A: Default to Express for simplicity and ecosystem maturity. Use Fastify if performance is critical or the user explicitly requests it.

**Q: How do I handle async errors in Express?**
A: Wrap async route handlers with error handling middleware or use `express-async-handler`:
```typescript
import asyncHandler from 'express-async-handler';

app.get('/data', asyncHandler(async (req, res) => {
  const data = await fetchData();
  res.json(data);
}));
```

**Q: When should I add a new dependency?**
A: Only when it provides clear value and:
- Solves a complex problem better than custom code
- Is well-maintained (recent commits, active community)
- Has good TypeScript support
- Doesn't significantly increase bundle size

**Q: How do I structure mock data?**
A: Static data in JSON files (`src/mocks/data/`), dynamic data with generators (`src/mocks/generators/`). Use faker.js for realistic fake data.

**Q: What's the difference between unit and integration tests?**
A:
- **Unit tests:** Test individual functions/methods in isolation with mocked dependencies
- **Integration tests:** Test multiple components together, including HTTP endpoints with supertest

**Q: Should I use default exports or named exports?**
A: Prefer **named exports** for better refactoring and tree-shaking:
```typescript
// ✅ Preferred
export const LocationService = class { /* ... */ };

// ❌ Avoid
export default class LocationService { /* ... */ }
```

**Q: How do I handle errors in async middleware?**
A: Always wrap in try/catch or use async handler, and pass to `next()`:
```typescript
app.use(async (req, res, next) => {
  try {
    await doSomething();
    next();
  } catch (error) {
    next(error); // Passes to error handler
  }
});
```

## Maintenance Notes

### Last Review

- **Date:** 2025-12-01
- **Stack:** Node.js + TypeScript + Express + Vitest
- **Status:** Documentation updated for modern TypeScript/Node.js stack
- **Next Review:** After initial project structure is implemented

### Update Triggers

This document should be updated when:
- ✅ Technology stack decisions are finalized
- ✅ New architectural patterns are established
- ✅ Major dependencies are added or changed
- ✅ Testing strategies evolve
- ✅ Build or deployment processes change
- ✅ New conventions or best practices are adopted
- ✅ Common gotchas or pitfalls are discovered

---

**Note to AI Assistants:** This is a living document that reflects the current state and best practices for the lionheart-mock project. As the codebase evolves, keep this documentation in sync. When making architectural decisions or establishing new patterns, document them here for consistency and future reference.
