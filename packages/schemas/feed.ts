import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().min(2).max(255),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

export const getFeedSchema = z.object({
  limit: z.number().max(50).default(20),
  cursor: z.string().nullish(),
  authorId: z.string().optional(),
});

export type GetFeedInput = z.infer<typeof getFeedSchema>;

export const likePostSchema = z.object({
  postId: z.string(),
});

export type LikePostInput = z.infer<typeof likePostSchema>;
