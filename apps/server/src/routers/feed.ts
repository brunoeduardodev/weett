import { feedGet } from "../services/feed/feedGet";
import { postCreate } from "../services/feed/postCreate";
import { t } from "../trpc";

export const feedRouter = t.router({
  postCreate,
  feedGet,
});
