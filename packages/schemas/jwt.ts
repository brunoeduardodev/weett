import { z } from "zod";

export const jwtContentSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  handle: z.string(),
});

export type JwtContent = z.infer<typeof jwtContentSchema>;
