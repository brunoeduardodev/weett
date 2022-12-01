import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { prisma } from "../database/prisma";
import { JwtContent, jwtContentSchema } from "@weett/schemas/jwt";

export const generateUserToken = (user: User) => {
  const content: JwtContent = {
    id: user.id,
    handle: user.handle,
    name: user.name,
  };

  const token = jwt.sign(content, process.env.JWT_SECRET!);

  return `Bearer ${token}`;
};

export const getUserFromToken = async (rawToken: string) => {
  const [bearer, token] = rawToken.split("Bearer ");

  if (!token)
    throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid JWT" });

  const payload = jwt.verify(token, process.env.JWT_SECRET!);
  const { id } = jwtContentSchema.parse(payload);

  const user = await prisma.user.findUniqueOrThrow({ where: { id } });
  return user;
};
