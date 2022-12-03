import { ensureAuthenticated } from "../../middlewares/authorization";
import { t } from "../..";

export const me = t.procedure
  .use(ensureAuthenticated)
  .query(({ ctx: { user, prisma } }) => {
    return prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
        weets: true,
      },
    });
  });
