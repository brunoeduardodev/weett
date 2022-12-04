import { createPostSchema } from "@weett/schemas";
import { ensureAuthenticated } from "@/trpc/middlewares/authorization";
import { t } from "@/trpc";

export const createPost = t.procedure
  .use(ensureAuthenticated)
  .input(createPostSchema)
  .mutation(async ({ ctx: { prisma, user }, input: { content } }) => {
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
  });
