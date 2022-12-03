import { t } from "..";

export const healthRouter = t.router({
  health: t.procedure.query(() => {
    return "Howdy 🚀";
  }),
});
