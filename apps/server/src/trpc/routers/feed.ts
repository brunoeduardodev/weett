import { getFeed } from "../services/feed";
import { t } from "..";
import { createPostSchema } from "@weett/schemas";
import { ensureAuthenticated } from "../middlewares";
import { createPost } from "../services/post";

export const feedRouter = t.router({
  createPost: t.procedure
    .input(createPostSchema)
    .use(ensureAuthenticated)
    .mutation(({ input, ctx }) => createPost(input, ctx)),

  getFeed,
});
