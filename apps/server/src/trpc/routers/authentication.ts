import { loginSchema, registerSchema } from "@weett/schemas";
import { login, register } from "../services/authentication";
import { t } from "..";

export const authenticationRouter = t.router({
  register: t.procedure.input(registerSchema).mutation(({ input, ctx }) => {
    return register(input, ctx);
  }),

  login: t.procedure.input(loginSchema).mutation(({ input, ctx }) => {
    return login(input, ctx);
  }),
});
