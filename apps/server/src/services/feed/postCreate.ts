import { createPostSchema } from "@weett/schemas";
import { ensureAuthenticated } from "../../middlewares/authorization";
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
