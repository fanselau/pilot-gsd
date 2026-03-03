<overview>
Deployment and infrastructure conventions for all projects. Cloudflare Workers is the primary deployment target. All deployments go through CI/CD — never manual.

**Principle:** Branch-based deployments with human approval gates. Dev deploys automatically, production requires PR approval.
</overview>

<deployment_flow>
## Deployment Pipeline

```
dev branch → push → GitHub Actions → deploy to dev worker
         ↓
staging branch ← merge dev → deploy to staging worker
         ↓
main branch ← PR from staging (Luca approves) → deploy to production
```

### Rules
- **NEVER run `wrangler deploy` manually** — always through GitHub Actions
- **NEVER merge to main without PR approval** from Luca
- **Dev deploys are automatic** — push to dev = deployed
- **Staging is the testing ground** — merge dev → staging freely
- **Production requires explicit approval** — PR from staging → main

### GitHub Actions Pattern
```yaml
name: Deploy
on:
  push:
    branches: [dev, staging, main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm test
      - name: Deploy
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```
</deployment_flow>

<cloudflare_workers>
## Cloudflare Workers

### Wrangler Config
```jsonc
// wrangler.jsonc
{
  "name": "project-name",
  "main": "dist/index.js",
  "compatibility_date": "2025-01-01",
  "compatibility_flags": ["nodejs_compat"],
  "kv_namespaces": [
    { "binding": "CACHE", "id": "xxx" }
  ],
  "vars": {
    "ENVIRONMENT": "production"
  }
}
```

### Environment-Specific Workers
```yaml
# In CI, patch wrangler.jsonc for environment:
- name: Patch worker name
  run: |
    if [ "${{ github.ref }}" = "refs/heads/dev" ]; then
      sed -i 's/"name": "project"/"name": "project-dev"/' wrangler.jsonc
    elif [ "${{ github.ref }}" = "refs/heads/staging" ]; then
      sed -i 's/"name": "project"/"name": "project-staging"/' wrangler.jsonc
    fi
```

### Workers Patterns
- **`nodejs_compat` flag** always enabled for Node.js API compatibility
- **KV** for key-value storage (sessions, caches, feature flags)
- **D1** for SQLite-style databases at the edge
- **Durable Objects** for stateful coordination (rare, only when needed)
- **Workers AI** for on-edge inference
</cloudflare_workers>

<docker>
## Docker (Local Development Only)

### Pattern
```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: app
    ports: ["5432:5432"]
    volumes: ["pgdata:/var/lib/postgresql/data"]

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

volumes:
  pgdata:
```

### Rules
- Docker is for **local services only** (databases, caches)
- Application code runs **natively** (not in containers)
- Use `docker compose up -d` for background services
- Never deploy application containers — use Cloudflare Workers
</docker>

<secrets>
## Secret Management

### GitHub Actions
- Store in repository secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- Per-environment secrets when needed (dev vs prod API keys)
- **Never commit secrets** to repository

### Local Development
- Use `.env` files (gitignored)
- Credential files in `~/.{service}_token` (chmod 600)
- Use `wrangler secret` for Workers secrets

### Rules
- **Never hardcode secrets** in source code
- **Never log secrets** even in debug mode
- **Rotate secrets** if accidentally exposed
- **Use environment-specific secrets** — dev and prod should use different keys
</secrets>

<monitoring>
## Post-Deployment

### Verification Checklist
1. ✅ Site loads (200 OK on main routes)
2. ✅ API endpoints respond correctly
3. ✅ Authentication works
4. ✅ Payment flow works (if applicable)
5. ✅ No console errors in browser
6. ✅ Performance acceptable (<100ms edge response)

### Rollback
- **Revert the merge** — `git revert` the merge commit, push
- **Wrangler rollback** as escape hatch: `wrangler rollback`
- **Always verify after rollback** — same checklist as deployment
</monitoring>
