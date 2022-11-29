import { z } from "zod";

export const isHandleAvailableSchema = z.object({
  handle: z.string().min(3),
});

export type isHandleAvailableInput = z.infer<typeof isHandleAvailableSchema>;
