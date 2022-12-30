import { CreatePostInput, createPostSchema } from "@weett/schemas";
import { useCallback } from "react";
import { trpc } from "../../utils/trpc";
import { Button } from "@weett/ui";
import { useZodForm } from "@/hooks/useZodForm";
import { useAuthentication } from "@/contexts/authentication";
import { useAuthenticationDialog } from "@/contexts/authenticationDialog";

export const NewTweet = () => {
  const { register, reset, handleSubmit } = useZodForm({
    schema: createPostSchema,
  });

  const { isSigned } = useAuthentication();
  const { showLogin } = useAuthenticationDialog();

  const utils = trpc.useContext();

  const { mutate: createPost, isLoading } = trpc.post.create.useMutation({
    onSuccess: (post) => {
      utils.feed.get.invalidate();
      return;
    },
  });

  const publish = useCallback(
    ({ content }: CreatePostInput) => {
      createPost({ content });
      reset();
    },
    [createPost, reset]
  );

  if (!isSigned) {
    return (
      <section className="flex flex-col w-full space-y-4 border-gray-50 border-2 min-h-[200px]  items-center justify-center">
        <h3>You need to be authenticated to start sharing your thoughts...</h3>
        <Button
          intent={"primary"}
          rounded={"full"}
          size="large"
          onClick={showLogin}
        >
          Login
        </Button>
      </section>
    );
  }

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
