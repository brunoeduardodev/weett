import { CreatePostInput } from "@weett/schemas";
import { AuthenticatedContext } from "@/trpc/context";

export const createPost = async (
  { content }: CreatePostInput,
  { prisma, user }: AuthenticatedContext
) => {
  const hashtags: string[] = [];

  const post = await prisma.weet.create({
    data: {
      content,
      hashtags: {
        connectOrCreate: hashtags.map((hashtag) => ({
          create: { name: hashtag },
          where: { name: hashtag },
        })),
      },
      userId: user.id,
    },
  });

  return post;
};
