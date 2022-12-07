import { getSelf } from "../services/user/getSelf";
import { t } from "..";
import { ensureAuthenticated } from "../middlewares";
import { updateSelf } from "../services/user/updateSelf";
import { updateSelfSchema } from "@weett/schemas";

export const userRouter = t.router({
  me: t.procedure.use(ensureAuthenticated).query(({ ctx }) => getSelf(ctx)),
  updateSelf: t.procedure
    .use(ensureAuthenticated)
    .input(updateSelfSchema)
    .mutation(({ input, ctx }) => updateSelf(input, ctx)),
});
