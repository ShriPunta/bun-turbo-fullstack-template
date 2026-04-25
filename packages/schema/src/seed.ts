import { createDb, schema } from "./client";
import { env } from "./env";

const db = createDb(env.DATABASE_URL);

await db
	.insert(schema.users)
	.values([
		{ email: "ada@example.com", name: "Ada Lovelace" },
		{ email: "alan@example.com", name: "Alan Turing" },
	])
	.onConflictDoNothing();

console.log("seeded");
process.exit(0);
