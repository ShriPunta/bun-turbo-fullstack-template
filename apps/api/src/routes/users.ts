import { zValidator } from "@hono/zod-validator";
import { schema } from "@pkg/schema";
import { CreateUserInput } from "@pkg/types";
import { Hono } from "hono";
import { db } from "../db";

export const usersRouter = new Hono()
	.get("/", async (c) => {
		const rows = await db.select().from(schema.users);
		return c.json(rows);
	})
	.post("/", zValidator("json", CreateUserInput), async (c) => {
		const input = c.req.valid("json");
		const [row] = await db.insert(schema.users).values(input).returning();
		return c.json(row, 201);
	});
