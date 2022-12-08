import { CreatePostInput, createPostSchema } from "@weett/schemas";
import { useCallback } from "react";
import { trpc } from "../../utils/trpc";
import { Button } from "@weett/ui";
import { useZodForm } from "@/hooks/useZodForm";

export const NewTweet = () => {
  const { register, reset, handleSubmit } = useZodForm({
    schema: createPostSchema,
  });

  const utils = trpc.useContext();

  const { mutate: createPost, isLoading } = trpc.post.create.useMutation({
    onSuccess: (post) => {
      utils.feed.get.invalidate();
      return;
    },
  });

  const publish = useCallback(({ content }: CreatePostInput) => {
    createPost({ content });
    reset();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(publish)}
      className="flex flex-col divide-y-2 divide-gray-50 space-y-4 border-gray-50 border-2"
    >
      <textarea
        className="bg-white p-4 placeholder:text-xl outline-none"
        {...register("content")}
        placeholder="What's happening?"
      />

      <div className="flex justify-end w-full p-2">
        <Button intent={"primary"} rounded={"full"} isLoading={isLoading}>
          Tweet
        </Button>
      </div>
    </form>
  );
};
