import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: () => (
		<div className="space-y-2">
			<h1 className="text-2xl font-bold">bun-turbo-fullstack-template</h1>
			<p className="text-neutral-600">Hono + Vite + Drizzle starter.</p>
		</div>
	),
});
