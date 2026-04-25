import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { UserSchema } from "@pkg/types";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

const UsersResponse = z.array(UserSchema);
type User = z.infer<typeof UserSchema>;

export const Route = createFileRoute("/users")({
	component: UsersPage,
});

function UsersPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState<string | null>(null);

	async function load() {
		try {
			const res = await fetch(`${env.VITE_API_URL}/users`);
			const json = await res.json();
			setUsers(UsersResponse.parse(json));
		} catch (e) {
			setError(e instanceof Error ? e.message : "failed");
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: mount-only fetch
	useEffect(() => {
		void load();
	}, []);

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<h2 className="text-xl font-bold">Users</h2>
				<Button size="sm" variant="outline" onClick={() => void load()}>
					Refresh
				</Button>
			</div>
			{error ? <p className="text-red-600">{error}</p> : null}
			<ul className="space-y-1">
				{users.map((u) => (
					<li key={u.id} className="rounded border px-3 py-2">
						<span className="font-medium">{u.name}</span>{" "}
						<span className="text-neutral-500">{u.email}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
