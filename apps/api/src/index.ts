import { Hono } from "hono";
import { logger } from "hono/logger";
import { env } from "./env";
import { usersRouter } from "./routes/users";

const app = new Hono()
	.use("*", logger())
	.get("/api/health", (c) => c.json({ ok: true }))
	.route("/api/users", usersRouter);

export default {
	port: env.PORT,
	fetch: app.fetch,
};

console.log(`API listening on :${env.PORT}`);
