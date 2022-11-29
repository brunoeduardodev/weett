import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { isHandleAvailable } from "../handle/isHandleAvailable";
import { generateUserToken } from "../../utils/jwt";
import { sanitizeUser } from "../../views/user";
import { Context } from "../../trpc";
import { UserSignupInput } from "@weett/schemas";

export const signup = async (
  { email, handle, name, password }: UserSignupInput,
  { prisma }: Context
) => {
  const allowedHandle = await isHandleAvailable({ handle });
  if (!allowedHandle)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Handle already being used",
    });

  const userWithSameEmail = await prisma.user.findUnique({ where: { email } });
  if (userWithSameEmail)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Email already being used",
    });

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { email, handle, name, password: hashedPassword },
  });

  const token = generateUserToken(user);
  return { user: sanitizeUser(user), token };
};
