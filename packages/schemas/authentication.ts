import { z } from "zod";
import { handleSchema } from "./handle";

export const registerSchema = z.object({
  name: z.string().min(3),
  handle: handleSchema,
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginInput = z.infer<typeof loginSchema>;
