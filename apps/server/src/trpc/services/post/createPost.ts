import { CreatePostInput } from "@weett/schemas";
import { AuthenticatedContext } from "../../context";
import { getHashtagsFromMessage } from "./getHashtags";

export const createPost = async (
  { content }: CreatePostInput,
  { prisma, user }: AuthenticatedContext
) => {
  const hashtags = getHashtagsFromMessage(content);

  console.log({ hashtags });

  const post = await prisma.weet.create({
    data: {
      content,
      hashtagUsage: {
        create: hashtags.map((hashtag) => ({
          hashtag: {
            connectOrCreate: {
              create: { name: hashtag },
              where: { name: hashtag },
            },
          },
        })),
      },

      userId: user.id,
    },
  });

  return post;
};
