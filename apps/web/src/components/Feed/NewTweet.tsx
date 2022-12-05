import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostInput, createPostSchema } from "@weett/schemas";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { Button } from "@weett/ui";

export const NewTweet = () => {
  const { register, reset, handleSubmit } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
  });

  const utils = trpc.useContext();

  const { mutate: createPost, isLoading } = trpc.feed.createPost.useMutation({
    onSuccess: (post) => {
      utils.feed.getFeed.invalidate();
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
