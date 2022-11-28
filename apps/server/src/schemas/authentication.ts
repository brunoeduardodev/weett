import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3),
  handle: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
