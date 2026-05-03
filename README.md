# bun-turbo-fullstack-template

Bun + Turbo monorepo. Hono API, Vite + React + TanStack Router web, Drizzle + Postgres, Biome, Husky, Zod everywhere.

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
bun install
cp .env.example .env
bun docker:up
bun db:generate
bun db:migrate
bun db:seed
bun dev
```

- Web: http://localhost:5173
- API: http://localhost:3000 (proxied via `/api`)
- Docs: http://localhost:3000/docs (Scalar UI)
- Spec: http://localhost:3000/openapi.json

## Scripts

- `bun dev` — run web + api via turbo
- `bun build` — build all workspaces
- `bun check` — biome format + lint across the repo
- `bun db:generate` — drizzle-kit generate migration from schema
- `bun db:migrate` — apply pending migrations
- `bun db:seed` — insert seed rows

## Zod boundaries

Env (`apps/api/src/env.ts`, `apps/web/src/env.ts`, `packages/schema/src/env.ts`), request/response schemas (`@hono/zod-openapi`), and API responses (`UsersResponse.parse` in `apps/web/src/routes/users.tsx`). Errors formatted with `z.prettifyError`.

## API docs

Routes are defined with `createRoute` from `@hono/zod-openapi`. Each route declares its request params/body and response schemas once — the OpenAPI spec and runtime validation are both derived from the same definition. The Scalar UI at `/docs` is generated automatically from the spec.

## License

MIT © Shridhar Puntambekar
