import { createPostSchema, likePostSchema } from "@weett/schemas";
import { t } from "..";
import { ensureAuthenticated } from "../middlewares";
import { createPost } from "../services/post";
import { likePost } from "../services/post/likePost";

export const postRouter = t.router({
  create: t.procedure
    .input(createPostSchema)
    .use(ensureAuthenticated)
    .mutation(({ input, ctx }) => createPost(input, ctx)),
  like: t.procedure
    .input(likePostSchema)
    .use(ensureAuthenticated)
    .mutation(({ input, ctx }) => likePost(input, ctx)),
});
