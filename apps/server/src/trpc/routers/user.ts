import { getSelf } from "../services/user/getSelf";
import { t } from "..";
import { ensureAuthenticated } from "../middlewares";
import { updateSelf } from "../services/user/updateSelf";
import { getUserSchema, updateSelfSchema } from "@weett/schemas";
import { getUser } from "../services/user/getUser";

export const userRouter = t.router({
  me: t.procedure.use(ensureAuthenticated).query(({ ctx }) => getSelf(ctx)),
  getUser: t.procedure
    .input(getUserSchema)
    .query(({ input, ctx }) => getUser(input, ctx)),
  updateSelf: t.procedure
    .use(ensureAuthenticated)
    .input(updateSelfSchema)
    .mutation(({ input, ctx }) => updateSelf(input, ctx)),
});
