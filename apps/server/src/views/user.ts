import { User } from "@prisma/client";

export const sanitizeUser = (rawUser: User) => {
  const { password, updatedAt, createdAt, ...user } = rawUser;
  return user;
};
