import { z } from "zod";

export const userSignupSchema = z.object({
  name: z.string().min(3),
  handle: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type UserSignupInput = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type UserLoginInput = z.infer<typeof userLoginSchema>;
