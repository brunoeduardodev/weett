import { t } from "..";
import { authenticationRouter } from "./authentication";
import { feedRouter } from "./feed";
import { handleRouter } from "./handle";
import { hashtagsRouter } from "./hashtags";
import { healthRouter } from "./health";
import { postRouter } from "./post";
import { userRouter } from "./user";

export const appRouter = t.router({
  health: healthRouter,
  authentication: authenticationRouter,
  feed: feedRouter,
  post: postRouter,
  user: userRouter,
  handle: handleRouter,
  hashtags: hashtagsRouter,
});

export type AppRouter = typeof appRouter;
