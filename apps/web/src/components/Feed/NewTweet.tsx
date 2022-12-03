import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostInput, createPostSchema } from "@weett/schemas";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { Button } from "../buttons/Button";

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
      className="flex flex-col p-2 divide-y-2 divide-gray-50 space-y-4"
    >
      <textarea
        className="bg-white p-4"
        {...register("content")}
        placeholder="New Tweet"
      />

      <Button variant="primary" className="self-end" isLoading={isLoading}>
        Tweet
      </Button>
    </form>
  );
};
