import { z } from "zod";

export const updateSelfSchema = z.object({
  name: z.string().min(3).optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
});

export const getUserSchema = z.object({
  handle: z.string().min(3),
});

export type UpdateSelfInput = z.infer<typeof updateSelfSchema>;
