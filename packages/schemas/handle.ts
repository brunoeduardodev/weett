import { z } from "zod";

export const handleSchema = z
  .string()
  .min(3)
  .regex(/^[A-z]*$/, "Should contain only letters");

export const isHandleAvailableSchema = z.object({
  handle: handleSchema,
});

export type isHandleAvailableInput = z.infer<typeof isHandleAvailableSchema>;
