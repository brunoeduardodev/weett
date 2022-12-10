import {
  ChatBubbleIcon,
  HeartIcon,
  Share1Icon,
  Share2Icon,
} from "@radix-ui/react-icons";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@weett/server";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { IconButton } from "@weett/ui";
import { useCallback, useState } from "react";
import { trpc } from "@/utils/trpc";

type Props = {
  post: inferRouterOutputs<AppRouter>["feed"]["get"]["posts"][0];
};

dayjs.extend(relativeTime);

export const Post = ({ post }: Props) => {
  const fromNow = dayjs(post.createdAt).fromNow();

  const [liked, setLiked] = useState(post.liked);

  const likeMutation = trpc.post.like.useMutation();
  const unlikeMutation = trpc.post.unlike.useMutation();

  const handleToggleLike = useCallback(
    (liked: boolean) => {
      try {
        const mutation = liked ? unlikeMutation : likeMutation;

        mutation.mutateAsync({ postId: post.id });
        setLiked(!liked);
      } catch (error) {
        setLiked(liked);
      }
    },
    [post.id, likeMutation, unlikeMutation]
  );

  return (
    <article className="p-4 flex gap-4 items-start ">
      <div className="">
        <img
          className="w-12 h-12 rounded-full bg-gray-400 object-cover"
          alt={`${post.author.profile.name}'s avatar`}
          src={post.author.profile.avatarUrl || undefined}
        />
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-4">
          <h3 className="font-bold">{post.author.profile.name}</h3>
          <p className="text-gray-700">@{post.author.handle}</p>
          <p className="text-gray-500" title={post.createdAt.toLocaleString()}>
            {fromNow}
          </p>
        </div>
        <p>{post.content}</p>

        <div className="flex justify-between w-full">
          <IconButton>
            <ChatBubbleIcon />
          </IconButton>

          <IconButton>
            <Share2Icon />
          </IconButton>

          <IconButton onClick={() => handleToggleLike(liked)}>
            <HeartIcon className={`${liked ? "text-red-500" : ""}`} />
          </IconButton>

          <IconButton>
            <Share1Icon />
          </IconButton>
          <div />
        </div>
      </div>
    </article>
  );
};
