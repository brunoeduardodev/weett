import { ensureAuthenticated } from "../../middlewares/authorization";
import { AuthenticatedContext, t } from "../..";

export const getSelf = async ({ user, prisma }: AuthenticatedContext) => {
  return prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
    include: { profile: true },
  });
};
