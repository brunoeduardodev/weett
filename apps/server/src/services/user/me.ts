import { ensureAuthenticated } from "../../middlewares/authorization";
import { t } from "../../trpc";

export const me = t.procedure
  .use(ensureAuthenticated)
  .query(({ ctx: { user, prisma } }) => {
    return prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        weets: true,
      },
    });
  });
