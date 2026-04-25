import { createDb } from "@pkg/schema";
import { env } from "./env";

export const db = createDb(env.DATABASE_URL);
