import { GetUserInput } from "@weett/schemas";
import { Context } from "../../context";

export const getUser = ({ handle }: GetUserInput, { prisma }: Context) => {
  return prisma.user.findUnique({
    where: { handle },
    include: { profile: true },
  });
};
