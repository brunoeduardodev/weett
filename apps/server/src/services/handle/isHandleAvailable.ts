import { prisma } from "../../database/prisma";
import { isHandleAvailableInput } from "../../schemas/handle";

export const isHandleAvailable = async ({ handle }: isHandleAvailableInput) => {
  const userWithSameHandle = await prisma.user.findUnique({
    where: { handle },
  });

  if (!userWithSameHandle) return true;

  return false;
};
