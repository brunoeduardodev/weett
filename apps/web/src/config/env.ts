import { z } from "zod";

const schema = z.object({
  trpcUrl: z.string().url(),
  uploadUrl: z.string().url(),
});

const envParse = schema.safeParse({
  trpcUrl: process.env.NEXT_PUBLIC_TRPC_URL,
  uploadUrl: process.env.NEXT_PUBLIC_UPLOAD_URL,
});

if (!envParse.success) {
  console.error(envParse.error);
  throw new Error("Invalid environment variables!");
}

export const envs = envParse.data;
