import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { env } from "@/env";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Home,
});

const STACK = [
	{ label: "Hono", desc: "Edge-first API server" },
	{ label: "Vite", desc: "Frontend bundler" },
	{ label: "React 19", desc: "UI library" },
	{ label: "TanStack Router", desc: "Type-safe file-based routing" },
	{ label: "Drizzle ORM", desc: "Type-safe SQL" },
	{ label: "Zod", desc: "Schema validation" },
	{ label: "Turborepo", desc: "Monorepo build cache" },
	{ label: "shadcn/ui", desc: "Component library" },
];

const FEATURES = [
	{
		title: "Shared types",
		desc: "@pkg/types shared between the API and web — one source of truth.",
	},
	{
		title: "OpenAPI docs",
		desc: "Auto-generated via @hono/zod-openapi + Scalar UI at localhost:<PORT>/docs.",
	},
	{
		title: "End-to-end type safety",
		desc: "DB schema → Drizzle → Zod → shared types → React UI.",
	},
	{
		title: "Local infra",
		desc: "Docker Compose spins up Postgres with a persistent bind-mount volume.",
	},
];

function Home() {
	return (
		<div className="max-w-2xl space-y-8">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tight">bun-turbo-fullstack-template</h1>
				<p className="text-sm text-muted-foreground">
					A batteries-included fullstack monorepo starter. Clone, rename, ship.
				</p>
			</div>

			<div className="space-y-3">
				<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
					Stack
				</p>
				<div className="flex flex-wrap gap-2">
					{STACK.map(({ label, desc }) => (
						<Badge key={label} variant="secondary" title={desc}>
							{label}
						</Badge>
					))}
				</div>
			</div>

			<div className="grid gap-3 sm:grid-cols-2">
				{FEATURES.map(({ title, desc }) => (
					<Card key={title}>
						<CardHeader className="pb-2">
							<CardTitle className="text-base">{title}</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>{desc}</CardDescription>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="flex gap-2">
				<Button asChild>
					<Link to="/users">Users demo</Link>
				</Button>
				<Button variant="outline" asChild>
					<a href={`${env.VITE_API_URL}/docs`} target="_blank" rel="noreferrer">
						API Docs
					</a>
				</Button>
			</div>
		</div>
	);
}
