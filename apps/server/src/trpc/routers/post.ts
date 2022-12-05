import { createPostSchema } from "@weett/schemas";
import { t } from "..";
import { ensureAuthenticated } from "../middlewares";
import { createPost } from "../services/post";

export const postRouter = t.router({
  create: t.procedure
    .input(createPostSchema)
    .use(ensureAuthenticated)
    .mutation(({ input, ctx }) => createPost(input, ctx)),
});
