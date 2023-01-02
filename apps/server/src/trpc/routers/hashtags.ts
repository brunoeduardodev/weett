import { t } from "..";
import { getTrending } from "../services/trending/getTrending";

export const hashtagsRouter = t.router({
  getTending: t.procedure.query(({ ctx }) => getTrending(ctx)),
});
