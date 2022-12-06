import { GetFeedInput } from "@weett/schemas";
import { Context } from "../../context";

export const getFeed = async (
  { limit, cursor, authorId }: GetFeedInput,
  { prisma }: Context
) => {
  const posts = await prisma.weet.findMany({
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,

    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: { id: true, handle: true, profile: true },
      },
    },
    where: {
      author: {
        id: authorId,
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
