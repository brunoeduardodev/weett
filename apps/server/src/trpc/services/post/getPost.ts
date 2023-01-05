import { Like, Profile, User, Weet } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { GetPostInput } from "@weett/schemas";
import { Context } from "../../context";

export const getPost = async (
  { postId }: GetPostInput,
  { prisma, user }: Context
) => {
  const post = await prisma.weet.findUnique({
    where: { id: postId },
    include: {
      author: { include: { profile: true } },
      _count: {
        select: { likes: true, replies: true },
      },
      likes: { where: { userId: user?.id } },
      repliesTo: {
        include: {
          author: { include: { profile: true } },

          _count: {
            select: { likes: true, replies: true },
          },
          likes: { where: { userId: user?.id } },
        },
      },
      replies: {
        include: {
          author: { include: { profile: true } },
          _count: {
            select: { likes: true, replies: true },
          },
          likes: { where: { userId: user?.id } },
        },
      },
    },
  });

  if (!post) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
  }

  const parsePost = (
    post: Weet & {
      author: User & { profile: Profile };
      likes: Like[];
      _count: { likes: number; replies: number };
    }
  ) => {
    return {
      id: post.id,
      author: post.author,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      likesCount: post._count.likes,
      liked: post.likes?.length > 0,
      repliesCount: post._count.replies,
    };
  };

  return {
    ...parsePost(post),
    repliesTo: post.repliesTo ? parsePost(post.repliesTo) : null,
    replies: post.replies.map(parsePost),
  };
};
