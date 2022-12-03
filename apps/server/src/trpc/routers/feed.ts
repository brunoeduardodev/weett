import { getFeed, createPost } from "../services/feed";
import { t } from "..";

export const feedRouter = t.router({
  createPost,
  getFeed,
});
