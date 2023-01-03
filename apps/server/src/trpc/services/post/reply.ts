import { TRPCError } from "@trpc/server";
import { ReplyPostInput } from "@weett/schemas";
import { AuthenticatedContext } from "../../context";

export const reply = async (
  { postId, content }: ReplyPostInput,
  { prisma, user }: AuthenticatedContext
) => {
  const targetPost = await prisma.weet.findUnique({ where: { id: postId } });
  if (!targetPost) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Target post not found",
    });
  }

  const weet = await prisma.weet.create({
    data: { replyId: postId, content, userId: user.id },
  });

  return weet;
};
