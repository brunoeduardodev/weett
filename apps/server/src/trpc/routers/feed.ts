import { getFeed, createPost } from "../services/feed";
import { t } from "..";
import { createPostSchema } from "@weett/schemas";
import { ensureAuthenticated } from "../middlewares";

export const feedRouter = t.router({
  createPost: t.procedure
    .input(createPostSchema)
    .use(ensureAuthenticated)
    .mutation(({ input, ctx }) => createPost(input, ctx)),

  getFeed,
});
