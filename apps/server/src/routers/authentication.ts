import { userSignupSchema } from "../schemas/authentication";
import { signup } from "../services/authentication/signup";
import { t } from "../trpc";

export const authenticationRouter = t.router({
  userSignup: t.procedure.input(userSignupSchema).mutation(({ input, ctx }) => {
    return signup(input, ctx);
  }),
});
