import { userLoginSchema, userSignupSchema } from "../schemas/authentication";
import { login } from "../services/authentication/login";
import { signup } from "../services/authentication/signup";
import { t } from "../trpc";

export const authenticationRouter = t.router({
  userSignup: t.procedure.input(userSignupSchema).mutation(({ input, ctx }) => {
    return signup(input, ctx);
  }),

  userLogin: t.procedure.input(userLoginSchema).mutation(({ input, ctx }) => {
    return login(input, ctx);
  }),
});
