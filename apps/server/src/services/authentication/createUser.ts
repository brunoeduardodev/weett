import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { prisma } from "../../database/prisma";
import { CreateUserInput } from "../../schemas/authentication";
import { isHandleAvailable } from "../handle/isHandleAvailable";

export const createUser = async ({
  email,
  handle,
  name,
  password,
}: CreateUserInput) => {
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

  const user = prisma.user.create({
    data: { email, handle, name, password: hashedPassword },
  });

  return { user };
};
