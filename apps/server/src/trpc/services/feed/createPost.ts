import { CreatePostInput } from "@weett/schemas";
import { AuthorizedService } from "@/trpc/types";
import { Weet } from "@prisma/client";

export const createPost: AuthorizedService<
  CreatePostInput,
  Promise<Weet>
> = async ({ ctx: { prisma, user }, input: { content } }) => {
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
