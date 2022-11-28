import { postCreate } from "../services/feed/postCreate";
import { t } from "../trpc";

export const feedRouter = t.router({
  postCreate,
});
