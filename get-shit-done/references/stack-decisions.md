<overview>
Default technology decisions for all projects built through Pilot. These are Luca's battle-tested preferences extracted from 5+ production codebases. When building new features or projects, follow these conventions unless the requirement explicitly specifies otherwise.

**Principle:** Edge-first, type-safe, performance-oriented development with modern tooling. Choose smaller, focused libraries over monolithic frameworks.
</overview>

<stack_defaults>
## Web Applications

### Frontend
- **React 19** with TypeScript strict mode
- **TanStack Router** for routing (NOT Next.js App Router)
- **TanStack Start** for SSR/RSC (NOT Next.js)
- **TanStack Query** for server state (`useSuspenseQuery` in components, `ensureQueryData` in loaders)
- **Zustand** for client state (with `useShallow` selectors, Immer for complex updates)
- **Zod** for all runtime validation (schemas, form validation, API contracts)

### Styling & UI
- **TailwindCSS 4.x** via Vite plugin (`@tailwindcss/vite`), NOT PostCSS setup
- **Dark mode: class strategy**
- **Lucide React** for icons (NOT heroicons, NOT react-icons)
- **Framer Motion** or **Motion One** for animations
- **No heavy component libraries** — build custom components with Tailwind
- **Design tokens** in Tailwind config, not CSS variables

### Backend / API
- **Hono** framework (NOT Express, NOT Fastify)
- **Drizzle ORM** with code-first schemas (NOT Prisma)
- **Better Auth** for authentication
- **Zod + openapi-typescript** for type-safe API clients
- **UUID v7** for IDs

### Database
- **PostgreSQL** for production data
- **Cloudflare KV** for edge storage
- **Better SQLite3** for local/CLI tools
- **Redis** for caching/realtime (when needed)

### Deployment
- **Cloudflare Workers** as primary deployment target
- **GitHub Actions** with branch-based deploys: dev → staging → main
- **Wrangler 4.x** for CF deployments
- **NEVER** manual `wrangler deploy` — always through CI/CD

### Build & DX
- **Vite 7.x** for bundling
- **PNPM** for package management (NOT npm, NOT yarn)
- **BiomeJS** for linting + formatting (NOT ESLint + Prettier)
- **Vitest** for testing (NOT Jest)
- **TypeScript strict mode** always enabled
- **TSup** for library/package builds

### CLI Tools
- **Bun** runtime for performance
- **Commander** for arg parsing
- **Better SQLite3** for local state
- **Picocolors** for terminal colors (NOT chalk)
</stack_defaults>

<forbidden_choices>
## Never Use

- **Next.js** — Vercel coupling, poor edge compatibility
- **Express** — Legacy, poor TypeScript support
- **Prisma** — Heavy, schema-first only, poor edge support
- **ESLint + Prettier** — Use BiomeJS instead (faster, single tool)
- **Jest** — Use Vitest (faster, Vite-native)
- **npm / yarn** — Use PNPM (better deps, workspaces)
- **CSS-in-JS** (styled-components, emotion) — Use Tailwind
- **Class components** — Hooks only
- **Redux / MobX** — Use Zustand
- **Axios** — Use native fetch or openapi-fetch
- **Moment.js / Day.js** — Use native Intl or date-fns
- **jQuery** — Never
</forbidden_choices>

<patterns>
## Architectural Patterns

### File Structure
```
src/
  routes/          # TanStack Router file-based routes
  components/      # Shared UI components
  lib/             # Utilities, helpers, constants
  hooks/           # Custom React hooks
  stores/          # Zustand stores
  api/             # API client, types, schemas
  server/          # Server-side code (Hono routes, DB)
```

### API Client Pattern
```typescript
// Use openapi-typescript generated types
import createClient from 'openapi-fetch';
import type { paths } from './api-types';
const client = createClient<paths>({ baseUrl: '/api' });
```

### State Pattern
```typescript
// Zustand store with Immer
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Store { items: Item[]; addItem: (item: Item) => void; }
const useStore = create<Store>()(immer((set) => ({
  items: [],
  addItem: (item) => set((state) => { state.items.push(item); }),
})));
```

### Query Pattern
```typescript
// Loader: prefetch
export const Route = createFileRoute('/items')({
  loader: ({ context }) => context.queryClient.ensureQueryData(itemsQuery()),
});
// Component: consume
function Items() {
  const { data } = useSuspenseQuery(itemsQuery());
}
```
</patterns>

<edge_cases>
## When to Deviate

- **Static marketing sites**: Use **Astro** + **Preact** (not React) for minimal JS
- **Rich text editing**: Use **PlateJS** (not TipTap, not Draft.js)
- **Undo/redo needed**: Add **Zundo** temporal middleware to Zustand
- **Template/email rendering**: Use **Astro** for static generation
- **Internal tools only**: **Nitro** runtime is acceptable (not just Workers)
</edge_cases>
