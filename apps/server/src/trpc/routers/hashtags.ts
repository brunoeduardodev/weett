import { getTrendingSchema } from "@weett/schemas";
import { t } from "..";
import { getTrending } from "../services/trending/getTrending";

export const hashtagsRouter = t.router({
  getTending: t.procedure
    .input(getTrendingSchema)
    .query(({ input, ctx }) => getTrending(input, ctx)),
});
