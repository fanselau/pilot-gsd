<overview>
Code quality standards for all projects. These are enforced by tooling and AI agents alike. The goal is maintainable, readable code that any developer (human or AI) can understand and modify.

**Principle:** Consistency over cleverness. Write code that reads like documentation.
</overview>

<typescript>
## TypeScript Standards

### Config
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  }
}
```

### Rules
- **`strict: true` always** — never disable
- **No `any`** — use `unknown` and narrow with type guards
- **No type assertions** (`as Type`) unless provably safe — prefer type narrowing
- **Prefer `interface` over `type`** for object shapes (better error messages, extendable)
- **Use discriminated unions** for state machines and variants
- **Return types on exported functions** — helps AI agents understand intent
- **Const assertions** for literal types: `as const`

### Naming Conventions
```typescript
// Types and interfaces: PascalCase
interface UserProfile { ... }
type ButtonVariant = 'primary' | 'secondary';

// Functions and variables: camelCase
function calculateDiscount(price: number): number { ... }
const maxRetries = 3;

// Constants: SCREAMING_SNAKE_CASE (only for true constants)
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const API_BASE_URL = 'https://api.example.com';

// Files: kebab-case
// user-profile.tsx, calculate-discount.ts, api-client.ts

// Boolean variables: prefix with is/has/should/can
const isLoading = true;
const hasPermission = checkAuth();
const shouldRetry = attempts < maxRetries;
```
</typescript>

<error_handling>
## Error Handling

### Patterns
```typescript
// Custom error classes with context
class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly context?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Result pattern for expected failures
type Result<T, E = AppError> = { ok: true; value: T } | { ok: false; error: E };

// Always catch at boundaries, not inline
// ✅ Good: catch in API handler, show user-friendly message
// ❌ Bad: try/catch around every function call
```

### Rules
- **Never swallow errors silently** — at minimum log them
- **User-facing errors**: friendly message, no stack traces
- **API errors**: consistent JSON format: `{ error: { code, message } }`
- **Validation errors**: return all errors, not just first: `{ errors: [...] }`
- **Use Zod `.safeParse()`** for validation that can fail
</error_handling>

<git_conventions>
## Git Conventions

### Commit Messages
Follow conventional commits:
```
type(scope): description

feat(auth): add OAuth2 login flow
fix(checkout): prevent duplicate charges
docs(readme): update installation instructions
refactor(api): extract validation middleware
test(auth): add login flow integration tests
chore(deps): update TanStack Query to v5.60
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`

### Branch Naming
```
feature/add-oauth-login
fix/duplicate-charges
refactor/api-middleware
```

### Rules
- **Atomic commits** — one logical change per commit
- **No WIP commits** on shared branches
- **Squash merge** feature branches into dev
- **Never force push** shared branches (dev, staging, main)
- **Delete branches** after merging
</git_conventions>

<code_organization>
## Code Organization

### Import Order
```typescript
// 1. Node builtins
import path from 'node:path';
import fs from 'node:fs';

// 2. External packages
import { Hono } from 'hono';
import { z } from 'zod';

// 3. Internal modules (aliased)
import { db } from '~/server/db';
import { auth } from '~/lib/auth';

// 4. Relative imports
import { Button } from '../components/button';
import type { User } from './types';
```

### Module Structure
```typescript
// Each module exports from a barrel (index.ts)
// But NEVER re-export everything — be explicit
export { createUser, deleteUser } from './user-service';
export type { User, UserCreate } from './types';
```

### Rules
- **No circular imports** — if A imports B, B cannot import A
- **Co-locate related code** — tests next to source, types next to implementation
- **Prefer named exports** over default exports (better refactoring, better tree-shaking)
- **One concern per file** — don't mix UI components with business logic
- **Keep files under 300 lines** — split if larger
</code_organization>

<performance>
## Performance Guidelines

- **Lazy load routes** — TanStack Router handles this automatically
- **Optimize images** — use `<img loading="lazy">`, serve WebP/AVIF
- **Minimize bundle** — check `npx vite-bundle-visualizer` periodically
- **Edge cache** — use `Cache-Control` headers, Cloudflare cache rules
- **No synchronous heavy computation** — use Web Workers or server-side
- **Database queries** — always use indexes, never `SELECT *`, limit results
- **React renders** — `useMemo`/`useCallback` only for measured performance issues, not preemptively
</performance>
