<overview>
Frontend design and component conventions for all projects. Ensures visual consistency, accessibility, and maintainability across the portfolio.

**Principle:** Utility-first styling with Tailwind. Build small, composable components. Accessibility is not optional.
</overview>

<component_architecture>
## Component Structure

### File Organization
```
components/
  ui/                    # Primitive UI components (Button, Input, Card, etc.)
    button.tsx
    input.tsx
    card.tsx
  features/              # Feature-specific composed components
    checkout/
      checkout-form.tsx
      cart-item.tsx
  layout/                # Layout components (Header, Footer, Sidebar)
    header.tsx
    sidebar.tsx
```

### Component Pattern
```typescript
// Props interface — always typed, never `any`
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

// Functional component with forwardRef when needed
export function Button({ variant = 'primary', size = 'md', loading, children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
```

### Rules
- **No class components** — functional components with hooks only
- **Props spread last** — `{...props}` at end for extensibility
- **`cn()` helper** for conditional classes (clsx + tailwind-merge)
- **Composition over configuration** — prefer children/slots over complex prop APIs
- **One component per file** — exceptions only for tightly coupled pairs
- **Export named** — `export function Button` not `export default`
</component_architecture>

<styling>
## Tailwind Conventions

### Class Organization
Order classes consistently:
```
layout → spacing → sizing → typography → colors → borders → effects → responsive → dark
```

Example:
```html
<div class="flex items-center gap-4 p-4 w-full text-sm text-gray-700 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-gray-900 dark:text-gray-200">
```

### Design Tokens
Use Tailwind config for all design values — never hardcode colors or spacing:
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: { 50: '#f0f9ff', 500: '#3b82f6', 900: '#1e3a5a' },
        surface: { DEFAULT: '#ffffff', dark: '#0a0a0a' },
      },
      spacing: { 18: '4.5rem', 22: '5.5rem' },
    },
  },
};
```

### Rules
- **Never use `style={}` prop** — always Tailwind classes
- **Never use arbitrary values** (`[#ff6600]`) if a token exists
- **Responsive: mobile-first** — `sm:` `md:` `lg:` breakpoints
- **Dark mode via `dark:` variant** — always support dark mode
- **Group hover/focus states** — `group-hover:`, `focus-visible:`
- **Use `@apply` sparingly** — only in global base styles, never in components
</styling>

<accessibility>
## Accessibility Requirements

### Non-Negotiable
- **Semantic HTML**: `<button>` not `<div onClick>`, `<nav>` not `<div class="nav">`
- **ARIA labels**: Every interactive element must be accessible
- **Keyboard navigation**: All interactive elements reachable via Tab, operable via Enter/Space
- **Focus indicators**: `focus-visible:ring-2 focus-visible:ring-blue-500`
- **Color contrast**: WCAG AA minimum (4.5:1 for text, 3:1 for large text)
- **Alt text**: Every `<img>` gets meaningful alt text or `alt=""`  for decorative

### Common Patterns
```typescript
// Accessible icon button
<button aria-label="Close dialog" className="...">
  <X className="h-4 w-4" />
</button>

// Accessible form field
<label htmlFor="email" className="...">Email</label>
<input id="email" type="email" aria-describedby="email-error" />
{error && <p id="email-error" role="alert" className="text-red-500">{error}</p>}

// Skip link
<a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
```
</accessibility>

<animation>
## Animation Patterns

### Library: Framer Motion / Motion One
```typescript
import { motion } from 'framer-motion';

// Entrance animation
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

// List stagger
<motion.ul>
  {items.map((item, i) => (
    <motion.li key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} />
  ))}
</motion.ul>
```

### Rules
- **Respect `prefers-reduced-motion`** — disable animations when user prefers
- **Keep animations under 300ms** for UI interactions
- **No animation on first paint** — only on state changes and user interactions  
- **Use `transform` and `opacity` only** — GPU-accelerated, no layout shifts
- **Loading states**: Skeleton screens over spinners, pulse animation for loading
</animation>

<responsive>
## Responsive Design

### Breakpoint Strategy
- **Mobile-first**: Base styles = mobile, then `sm:` `md:` `lg:` `xl:`
- **Container queries** when component needs to respond to parent, not viewport
- **No horizontal scroll** on any viewport width
- **Touch targets**: Minimum 44x44px on mobile

### Layout Patterns
```typescript
// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

// Responsive navigation
<nav className="flex flex-col sm:flex-row items-center gap-4">

// Responsive text
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
```
</responsive>
