import { LikePostInput } from "@weett/schemas";
import { AuthenticatedContext } from "../../context";

export const unlikePost = (
  { postId }: LikePostInput,
  { prisma, user }: AuthenticatedContext
) => {
  return prisma.like.delete({
    where: {
      weetId_userId: {
        userId: user.id,
        weetId: postId,
      },
    },
  });
};
