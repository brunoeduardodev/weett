import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().max(255),
  hashtags: z.array(z.string().min(3)),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
