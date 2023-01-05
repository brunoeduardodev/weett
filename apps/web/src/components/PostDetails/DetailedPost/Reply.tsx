import { consts } from "@/config/consts";
import { useZodForm } from "@/hooks/useZodForm";
import { trpc } from "@/utils/trpc";
import { ReplyPostInput, replyPostSchema } from "@weett/schemas";
import { Button } from "@weett/ui";
import { useCallback } from "react";

type Props = {
  postId: string;
};

export const Reply = ({ postId }: Props) => {
  const { isLoading, data, error } = trpc.user.me.useQuery();

  const { register, handleSubmit, reset } = useZodForm({
    schema: replyPostSchema,
    defaultValues: { postId },
  });

  const replyMutation = trpc.post.reply.useMutation({
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = useCallback(
    (data: ReplyPostInput) => {
      console.log({ data });
      replyMutation.mutate(data);
    },
    [replyMutation]
  );

  if (isLoading || error || !data) return null;

  return (
    <form
      className="flex gap-4 p-2 border-t border-b border-gray-300 items-center justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-2 items-center w-full">
        <img
          src={data.profile.avatarUrl || consts.DEFAULT_PROFILE}
          className="w-12 h-12 rounded-full filter hover:opacity-75 transition object-cover"
        />

        <textarea
          {...register("content")}
          className="p-3 text-base placeholder:text-xl w-full items-center"
          placeholder="Weet your reply"
        />
      </div>

      <Button type="submit" rounded="full" isLoading={replyMutation.isLoading}>
        Reply
      </Button>
    </form>
  );
};
