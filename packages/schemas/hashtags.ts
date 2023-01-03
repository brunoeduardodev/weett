import { z } from "zod";

export const getTrendingSchema = z.object({
  test: z.string().optional(),
  limit: z.number().max(50).default(10),
});

export type GetTrendingInput = z.infer<typeof getTrendingSchema>;
