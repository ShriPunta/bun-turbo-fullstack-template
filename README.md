# bun-turbo-fullstack-template

Bun + Turbo monorepo. Hono API, Vite + React + TanStack Router web, Drizzle + Postgres, Biome, Husky, Zod everywhere.

## Layout

```
apps/
  web/        # Vite + React 19 + TanStack Router + shadcn/Tailwind (no React Compiler)
  api/        # Hono + @hono/zod-validator + Drizzle
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

## Scripts

- `bun dev` — run web + api via turbo
- `bun build` — build all workspaces
- `bun check` — biome format + lint across the repo
- `bun db:generate` — drizzle-kit generate migration from schema
- `bun db:migrate` — apply pending migrations
- `bun db:seed` — insert seed rows

## Zod boundaries

Env (`apps/api/src/env.ts`, `apps/web/src/env.ts`, `packages/schema/src/env.ts`), request bodies (`@hono/zod-validator`), and API responses (`UsersResponse.parse` in `apps/web/src/routes/users.tsx`). Errors formatted with `z.prettifyError`.

## License

MIT © Shridhar Puntambekar
