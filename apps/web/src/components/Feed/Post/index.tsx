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
import { IconButton } from "ui/buttons/IconButton";

type Props = {
  post: inferRouterOutputs<AppRouter>["feed"]["getFeed"]["posts"][0];
};

dayjs.extend(relativeTime);

export const Post = ({ post }: Props) => {
  const fromNow = dayjs(post.createdAt).fromNow();

  return (
    <article className="p-4 flex gap-4 items-start ">
      <div className="">
        <div className="w-12 h-12 rounded-full bg-gray-400" />
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-4">
          <h3 className="font-bold">{post.author.name}</h3>
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

          <IconButton>
            <HeartIcon />
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
