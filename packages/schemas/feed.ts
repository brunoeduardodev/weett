import { z, ZodLazy } from "zod";

export const createPostSchema = z.object({
  content: z.string().min(2).max(255),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

export const getFeedSchema = z.object({
  limit: z.number().max(50).default(20),
  cursor: z.string().nullish(),
  authorId: z.string().optional(),
  search: z
    .object({
      content: z.string().optional(),
      hashtags: z.array(z.string()).optional(),
    })
    .optional(),
});

export type GetFeedInput = z.infer<typeof getFeedSchema>;

export const likePostSchema = z.object({
  postId: z.string(),
});

export type LikePostInput = z.infer<typeof likePostSchema>;

export const unlikePostSchema = z.object({
  postId: z.string(),
});

export type UnlikePostInput = z.infer<typeof unlikePostSchema>;

export const replyPostSchema = z.object({
  postId: z.string(),
  content: z.string(),
});

export type ReplyPostInput = z.infer<typeof replyPostSchema>;

export const getPostSchema = z.object({
  postId: z.string(),
});

export type GetPostInput = z.infer<typeof getPostSchema>;
