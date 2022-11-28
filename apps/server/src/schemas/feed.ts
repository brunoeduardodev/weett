import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().max(255),
  hashtags: z.array(z.string().min(3)),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

export const getFeedSchema = z.object({
  take: z.number().max(50).default(20),
  skip: z.number().default(0),
});

export type GetFeedInput = z.infer<typeof getFeedSchema>;
