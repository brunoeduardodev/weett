import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { prisma } from "../../database/prisma";
import { UserLoginInput } from "../../schemas/authentication";
import { generateUserToken } from "../../utils/jwt";

export const login = async ({ email, password }: UserLoginInput) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid Credentials",
    });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid Credentials",
    });

  const token = generateUserToken(user);

  return { token, user };
};
