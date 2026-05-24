# bun-turbo-fullstack-template

Bun + Turbo monorepo. Hono API, Vite + React + TanStack Router web, Drizzle + Postgres, Biome, Husky, Zod everywhere.

## Package manager: pnpm + Bun

**pnpm** is the package manager; **bun** is the runtime. They are not interchangeable:

- `pnpm install` / `pnpm add` / `pnpm remove` — install or modify deps
- `bun run <script>` — execute scripts (never `pnpm run`)
- `npm`, `yarn`, and `bun install` are blocked

**Why pnpm?** npm's `preinstall`/`postinstall` lifecycle scripts execute arbitrary code during `npm install` with no opt-out, enabling supply-chain attacks via malicious packages. pnpm disables lifecycle scripts on third-party packages by default (`allowBuilds` in `pnpm-workspace.yaml`), requiring explicit opt-in for packages that legitimately need native compilation. This significantly reduces the attack surface from dependency installs.

## Layout

```
apps/
  web/        # Vite + React 19 + TanStack Router + shadcn/Tailwind (no React Compiler)
  api/        # Hono + @hono/zod-openapi + Drizzle — auto-generated OpenAPI spec + Scalar UI
packages/
  schema/     # Drizzle schema, client, migrate, seed
  types/      # Shared Zod schemas + inferred types
infra/        # docker-compose.yml (Postgres 16)
```

## Quickstart

```bash
pnpm install
cp .env.example .env
bun run docker:up
bun run db:generate
bun run db:migrate
bun run db:seed
bun run dev
```

- Web: http://localhost:5173
- API: http://localhost:3000 (proxied via `/api`)
- Docs: http://localhost:3000/docs (Scalar UI)
- Spec: http://localhost:3000/openapi.json

## Scripts

- `bun run dev` — run web + api via turbo
- `bun run build` — build all workspaces
- `bun run check` — biome format + lint across the repo
- `bun run db:generate` — drizzle-kit generate migration from schema
- `bun run db:migrate` — apply pending migrations
- `bun run db:seed` — insert seed rows

## Zod boundaries

Env (`apps/api/src/env.ts`, `apps/web/src/env.ts`, `packages/schema/src/env.ts`), request/response schemas (`@hono/zod-openapi`), and API responses (`UsersResponse.parse` in `apps/web/src/routes/users.tsx`). Errors formatted with `z.prettifyError`.

## API docs

Routes are defined with `createRoute` from `@hono/zod-openapi`. Each route declares its request params/body and response schemas once — the OpenAPI spec and runtime validation are both derived from the same definition. The Scalar UI at `/docs` is generated automatically from the spec.

## Known issues

**Postgres bind-mount on Linux CI** — Docker auto-creates `infra/data/pgdata` as `root:root`. On rootless Docker or hardened CI runners the Postgres entrypoint may fail with `Permission denied` because it cannot `chown` the directory. Fix: pre-create the directory with the correct owner (`mkdir -p infra/data/pgdata && chown 999:999 infra/data/pgdata`) or switch to a named volume.

## License

MIT © Shridhar Puntambekar
