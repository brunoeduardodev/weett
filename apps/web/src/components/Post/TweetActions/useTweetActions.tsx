import { useAuthentication } from "@/contexts/authentication";
import { useAuthenticationDialog } from "@/contexts/authenticationDialog";
import { trpc } from "@/utils/trpc";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@weett/server";
import { useCallback, useState } from "react";

type Post = inferRouterOutputs<AppRouter>["feed"]["get"]["posts"][0];

export const useTweetActions = (post: Post) => {
  const { showLogin } = useAuthenticationDialog();
  const { isSigned } = useAuthentication();

  const [liked, setLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  const likeMutation = trpc.post.like.useMutation();
  const unlikeMutation = trpc.post.unlike.useMutation();

  const handleToggleLike = useCallback(
    async (liked: boolean) => {
      if (!isSigned) {
        showLogin();
        return;
      }

      try {
        const mutation = liked ? unlikeMutation : likeMutation;
        setLiked(!liked);
        setLikesCount((count) => (liked ? count - 1 : count + 1));

        await mutation.mutateAsync({ postId: post.id });
      } catch (error) {
        console.log({ error });
        setLiked(liked);
        setLikesCount((count) => (liked ? count + 1 : count - 1));
      }
    },
    [post.id, likeMutation, unlikeMutation, isSigned, showLogin]
  );

  return { liked, likesCount, toggleLike: handleToggleLike };
};
