import { z } from "zod";

const EnvSchema = z.object({
	VITE_API_URL: z.string().default("/api"),
});

const parsed = EnvSchema.safeParse(import.meta.env);
if (!parsed.success) {
	console.error("Invalid web env:", z.prettifyError(parsed.error));
	throw new Error("Invalid web env");
}

export const env = parsed.data;
