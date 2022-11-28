import { userSignupSchema } from "../schemas/authentication";
import { signup } from "../services/authentication/signup";
import { t } from "../trpc";

export const authenticationRouter = t.router({
  userSignupSchema: t.procedure
    .input(userSignupSchema)
    .mutation(({ input }) => {
      return signup(input);
    }),
});
