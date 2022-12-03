import { me } from "../services/user/me";
import { t } from "../trpc";

export const userRouter = t.router({
  me,
});
