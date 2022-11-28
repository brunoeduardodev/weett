import { ensureAuthenticated } from "../../middlewares/authorization";
import { createPostSchema } from "../../schemas/feed";
import { t } from "../../trpc";

export const postCreate = t.procedure
  .use(ensureAuthenticated)
  .input(createPostSchema)
  .mutation(async ({ ctx: { prisma, user }, input: { content, hashtags } }) => {
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
