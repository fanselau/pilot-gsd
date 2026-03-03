<overview>
Testing standards for all projects built through Pilot. Every feature should have tests appropriate to its type. The goal is confidence in deployments, not coverage metrics.

**Principle:** Test behavior, not implementation. If you can describe what the user sees or what the function returns, write that test.
</overview>

<unit_testing>
## Unit Testing (Vitest)

### Setup
- **Framework**: Vitest (NOT Jest)
- **Environment**: `jsdom` for component tests, `node` for pure logic
- **Test location**: Colocated `*.test.ts` files next to source, OR `test/` directory at project root

### Patterns
```typescript
import { describe, it, expect, vi } from 'vitest';

// Test behavior, not implementation
describe('calculatePrice', () => {
  it('applies discount for bulk orders', () => {
    expect(calculatePrice({ qty: 100, unitPrice: 10 })).toBe(900);
  });

  it('throws on negative quantity', () => {
    expect(() => calculatePrice({ qty: -1, unitPrice: 10 })).toThrow('Invalid quantity');
  });
});
```

### Rules
- **One assertion focus per test** — test one behavior, may use multiple expects
- **Descriptive names**: `it('applies 10% discount when quantity exceeds 50')` not `it('works')`
- **No implementation details**: Don't test private methods or internal state
- **Mock boundaries only**: Mock external APIs, databases, file system — not internal modules
- **Use `vi.fn()` and `vi.spyOn()`** for mocks, never hand-rolled fakes
- **Snapshot tests**: Only for serializable output (JSON, CLI output). Never for UI components.
</unit_testing>

<component_testing>
## Component Testing

### Setup
- **@testing-library/react** with Vitest
- **User-event** for interactions (NOT fireEvent)
- **MSW** for API mocking in component tests

### Rules
- **Query by accessibility role first**: `getByRole('button', { name: 'Submit' })`
- **Never query by className or test ID** unless absolutely necessary
- **Test what the user sees**: visible text, accessible labels, form behavior
- **Don't test styling**: CSS classes, computed styles, etc.

### Priority
```
getByRole > getByLabelText > getByPlaceholderText > getByText > getByTestId
```
</component_testing>

<e2e_testing>
## E2E Testing (Playwright)

### Setup
- **Playwright** (NOT Cypress)
- **Headed mode** for debugging, headless for CI
- Test critical user journeys, not every page

### Patterns
```typescript
import { test, expect } from '@playwright/test';

test('user can complete checkout', async ({ page }) => {
  await page.goto('/products');
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page.getByRole('heading', { name: 'Your Cart' })).toBeVisible();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/\/checkout/);
});
```

### Rules
- **Web-first assertions**: `expect(locator).toBeVisible()` not manual waits
- **No hard sleeps**: Use `waitFor`, `toBeVisible`, `toHaveURL` instead of `sleep()`
- **Semantic locators**: Same priority as component tests (role > label > testid)
- **Page Object Model** for complex flows:
  ```typescript
  class CheckoutPage {
    constructor(private page: Page) {}
    async fillShipping(data: ShippingData) { /* ... */ }
    async submitOrder() { /* ... */ }
  }
  ```
- **Isolate tests**: Each test should work independently, reset state between tests
- **Screenshot on failure**: Configure `use: { screenshot: 'only-on-failure' }`

### Agent-Browser Testing (verify-auto)
For automated verification via AI agent + headless browser:
- Use `gsd-verify-auto` command — NEVER use agent-browser directly
- Agent navigates the app, checks visible behavior, reports pass/fail
- Focus on: does the feature WORK, not does it LOOK right
- Keep verification scripts short — one flow per verify
</e2e_testing>

<api_testing>
## API Testing

### Setup
- **Vitest** with `app.request()` for Hono
- **@cloudflare/vitest-pool-workers** for Workers-specific testing
- **Testcontainers** for integration tests needing real databases

### Patterns
```typescript
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('POST /api/items', () => {
  it('creates item and returns 201', async () => {
    const res = await app.request('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test Item' }),
    });
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.name).toBe('Test Item');
    expect(data.id).toBeDefined();
  });
});
```

### Rules
- **Test HTTP behavior**: status codes, response shapes, error formats
- **Validate with Zod**: Parse responses through the same schemas used in production
- **Test error paths**: 400 (validation), 401 (auth), 404 (not found), 500 (server)
- **Mock external services**: Stripe, AI APIs, etc. — never call real APIs in tests
</api_testing>

<when_to_test>
## When to Write Tests

**Always test:**
- Business logic with defined inputs/outputs
- API endpoints (request → response contracts)
- Data transformations, parsing, formatting
- Validation rules
- State machines and workflows
- Critical user journeys (E2E)

**Skip tests for:**
- UI layout and styling (visual regression if needed)
- Configuration changes
- Simple CRUD with no business logic
- One-off scripts and migrations
- Glue code connecting existing tested components
</when_to_test>
