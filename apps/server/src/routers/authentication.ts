import { createUserSchema } from "../schemas/authentication";
import { createUser } from "../services/authentication/createUser";
import { t } from "../trpc";

export const authenticationRouter = t.router({
  userCreate: t.procedure.input(createUserSchema).mutation(({ input }) => {
    return createUser(input);
  }),
});
