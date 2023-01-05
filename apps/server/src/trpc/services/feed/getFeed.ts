import { GetFeedInput } from "@weett/schemas";
import { Context } from "../../context";

export const getFeed = async (
  { limit, cursor, authorId, search }: GetFeedInput,
  { prisma, user }: Context
) => {
  const posts = await prisma.weet.findMany({
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,

    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: { likes: true, replies: true },
      },
      likes: user ? { where: { userId: user.id } } : false,
      author: {
        select: { id: true, handle: true, profile: true },
      },
      replies: {
        orderBy: { likes: { _count: "desc" } },
        take: 1,
      },
    },
    where: {
      author: {
        id: authorId,
      },
      replyId: null,
      ...(search?.hashtags
        ? {
            hashtagUsage: {
              some: { hashtag: { name: { in: search.hashtags } } },
            },
          }
        : {}),
      ...(search?.content
        ? {
            content: {
              contains: search.content,
            },
          }
        : {}),
    },
  });

  let nextCursor: string | null = null;
  if (posts.length > limit) {
    nextCursor = posts.pop()!.id;
  }

  const parsedPosts = posts.map((post) => {
    return {
      id: post.id,
      author: post.author,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      likesCount: post._count.likes,
      liked: post.likes?.length > 0,
      // topReply: post.replies[0],
      repliesCount: post._count.replies,
    };
  });

  return {
    posts: parsedPosts,
    nextCursor,
  };
};
