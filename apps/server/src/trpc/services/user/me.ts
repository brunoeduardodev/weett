import { ensureAuthenticated } from "../../../trpc/middlewares/authorization";
import { t } from "../../../trpc";

export const me = t.procedure
  .use(ensureAuthenticated)
  .query(({ ctx: { user, prisma } }) => {
    return prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
        profile: true,
      },
    });
  });
