import {
  createPostSchema,
  getPostSchema,
  likePostSchema,
  replyPostSchema,
  unlikePostSchema,
} from "@weett/schemas";
import { t } from "..";
import { ensureAuthenticated } from "../middlewares";
import { createPost } from "../services/post";
import { likePost } from "../services/post/likePost";
import { reply } from "../services/post/reply";
import { unlikePost } from "../services/post/unlikePost";

export const postRouter = t.router({
  create: t.procedure
    .input(createPostSchema)
    .use(ensureAuthenticated)
    .mutation(({ input, ctx }) => createPost(input, ctx)),
  like: t.procedure
    .input(likePostSchema)
    .use(ensureAuthenticated)
    .mutation(({ input, ctx }) => likePost(input, ctx)),
  unlike: t.procedure
    .input(unlikePostSchema)
    .use(ensureAuthenticated)
    .mutation(({ input, ctx }) => unlikePost(input, ctx)),
  reply: t.procedure
    .input(replyPostSchema)
    .use(ensureAuthenticated)
    .mutation(({ input, ctx }) => reply(input, ctx)),
});
