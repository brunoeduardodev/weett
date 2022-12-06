import { t } from "..";
import { getFeedSchema } from "@weett/schemas";
import { getFeed } from "../services/feed";

export const feedRouter = t.router({
  get: t.procedure
    .input(getFeedSchema)
    .query(({ input, ctx }) => getFeed(input, ctx)),
});
