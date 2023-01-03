import { z } from "zod";

export const getTrendingSchema = z.object({
  limit: z.number().max(50).default(10),
  cursor: z.string().nullish(),
});

export type GetTrendingInput = z.infer<typeof getTrendingSchema>;
