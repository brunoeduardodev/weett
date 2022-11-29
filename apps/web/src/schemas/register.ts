import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(6),
  handle: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
