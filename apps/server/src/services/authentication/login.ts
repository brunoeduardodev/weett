import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { LoginInput } from "@weett/schemas";
import { generateUserToken } from "../../utils/jwt";
import { sanitizeUser } from "../../views/user";
import { Context } from "../../trpc";

export const login = async (
  { email, password }: LoginInput,
  { prisma }: Context
) => {
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

  return { token, user: sanitizeUser(user) };
};
