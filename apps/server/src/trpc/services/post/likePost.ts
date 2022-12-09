import { LikePostInput } from "@weett/schemas";
import { AuthenticatedContext } from "../../context";

export const likePost = (
  { postId }: LikePostInput,
  { prisma, user }: AuthenticatedContext
) => {
  return prisma.like.create({
    data: {
      userId: user.id,
      weetId: postId,
    },
  });
};
