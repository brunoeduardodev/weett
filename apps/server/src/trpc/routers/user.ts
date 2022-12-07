import { me } from "../services/user/me";
import { t } from "..";
import { ensureAuthenticated } from "../middlewares";
import { updateSelf } from "../services/user/updateSelf";
import { updateSelfSchema } from "@weett/schemas";

export const userRouter = t.router({
  me,
  updateSelf: t.procedure
    .use(ensureAuthenticated)
    .input(updateSelfSchema)
    .mutation(({ input, ctx }) => updateSelf(input, ctx)),
});
