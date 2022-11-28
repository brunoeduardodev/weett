import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { prisma } from "../database/prisma";
import { jwtSchema } from "../schemas/jwt";

export const generateUserToken = (user: User) => {
  const token = jwt.sign(user.id, process.env.JWT_SECRET!);

  return `Bearer ${token}`;
};

export const getUserFromToken = async (rawToken: string) => {
  const [bearer, token] = rawToken.split("Bearer ");

  if (!token)
    throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid JWT" });

  const userId = jwtSchema.parse(token);

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  return user;
};
