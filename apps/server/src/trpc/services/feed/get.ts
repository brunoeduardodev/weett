import { GetFeedInput } from "@weett/schemas";
import { Context } from "../../context";

export const get = async (
  { limit, cursor }: GetFeedInput,
  { prisma }: Context
) => {
  const lastWeek = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);

  const posts = await prisma.weet.findMany({
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,

    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: { id: true, name: true, handle: true },
      },
    },
    where: {
      createdAt: {
        gt: lastWeek,
      },
    },
  });

  let nextCursor: string | null = null;
  if (posts.length > limit) {
    nextCursor = posts.pop()!.id;
  }

  return {
    posts,
    nextCursor,
  };
};
