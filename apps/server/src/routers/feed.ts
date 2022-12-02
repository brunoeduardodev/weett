import { getFeed, createPost } from "../services/feed";
import { t } from "../trpc";

export const feedRouter = t.router({
  createPost,
  getFeed,
});
