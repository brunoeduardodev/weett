import { z } from "zod";

export const jwtContentSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  email: z.string(),
});

export type JwtContent = z.infer<typeof jwtContentSchema>;
