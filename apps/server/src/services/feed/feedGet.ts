import { getFeedSchema } from "@weett/schemas";
import { t } from "../../trpc";

export const feedGet = t.procedure
  .input(getFeedSchema)
  .query(async ({ input: { skip, take }, ctx: { prisma } }) => {
    const lastWeek = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);

    const posts = await prisma.weet.findMany({
      take,
      skip,
      where: {
        createdAt: {
          gt: lastWeek,
        },
      },
    });

    return posts;
  });
