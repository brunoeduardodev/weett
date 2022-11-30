import {
  createSessionSchema,
  createUserSchema,
  deleteSessionSchema,
  deleteUserSchema,
  getSessionAndUserSchema,
  getUserByAccountSchema,
  getUserByEmailSchema,
  getUserSchema,
  linkAccountSchema,
  unlinkAccountSchema,
  updateSessionSchema,
  updateUserSchema,
} from "@weett/schemas";
import { t } from "../trpc";

export const authenticationRouter = t.router({
  createUser: t.procedure
    .input(createUserSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return prisma.user.create({
        data: {
          ...input,
          handle: `@${input.email.split("@")[0]} ${Math.floor(
            Math.random() * 1000
          )}`,
        },
      });
    }),
  getUser: t.procedure
    .input(getUserSchema)
    .query(({ input: id, ctx: { prisma } }) => {
      return prisma.user.findUnique({ where: { id } });
    }),
  getUserByEmail: t.procedure
    .input(getUserByEmailSchema)
    .query(({ input: email, ctx: { prisma } }) => {
      return prisma.user.findUnique({ where: { email } });
    }),
  getUserByAccount: t.procedure
    .input(getUserByAccountSchema)
    .query(async ({ input: provider_providerAccountId, ctx: { prisma } }) => {
      const account = await prisma.account.findUnique({
        where: { provider_providerAccountId },
        select: { user: true },
      });

      return account?.user || null;
    }),
  updateUser: t.procedure
    .input(updateUserSchema)
    .mutation(async ({ input: { id, ...data }, ctx: { prisma } }) => {
      return prisma.user.update({
        where: { id },
        data,
      });
    }),

  deleteUser: t.procedure
    .input(deleteUserSchema)
    .mutation(async ({ input: id, ctx: { prisma } }) => {
      return prisma.user.delete({ where: { id } });
    }),

  linkAccount: t.procedure
    .input(linkAccountSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      prisma.account.create({ data: input });
    }),

  unlinkAccount: t.procedure
    .input(unlinkAccountSchema)
    .mutation(({ input: provider_providerAccountId, ctx: { prisma } }) => {
      prisma.account.delete({ where: { provider_providerAccountId } });
    }),

  getSessionAndUser: t.procedure
    .input(getSessionAndUserSchema)
    .query(async ({ input: sessionToken, ctx: { prisma } }) => {
      const userAndSession = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });

      if (!userAndSession) {
        return null;
      }

      const { user, ...session } = userAndSession;
      return { user, session };
    }),

  createSession: t.procedure
    .input(createSessionSchema)
    .mutation(({ input, ctx: { prisma } }) => {
      return prisma.session.create({ data: input });
    }),

  updateSession: t.procedure
    .input(updateSessionSchema)
    .mutation(({ input, ctx: { prisma } }) => {
      return prisma.session.update({
        where: { sessionToken: input.sessionToken },
        data: input,
      });
    }),

  deleteSession: t.procedure
    .input(deleteSessionSchema)
    .mutation(({ input: sessionToken, ctx: { prisma } }) => {
      return prisma.session.delete({ where: { sessionToken } });
    }),
});
