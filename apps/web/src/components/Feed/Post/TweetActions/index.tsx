import {
  ChatBubbleIcon,
  HeartIcon,
  Share1Icon,
  Share2Icon,
} from "@radix-ui/react-icons";

import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@weett/server";
import { IconButton } from "@weett/ui";
import { useTweetActions } from "./useTweetActions";

type Props = {
  post: inferRouterOutputs<AppRouter>["feed"]["get"]["posts"][0];
};

export const TweetActions = ({ post }: Props) => {
  const { liked, likesCount, toggleLike } = useTweetActions(post);

  return (
    <div className="flex justify-between w-full">
      <IconButton>
        <ChatBubbleIcon />
      </IconButton>

      <IconButton>
        <Share2Icon />
      </IconButton>

      <span className="flex gap-2 items-center">
        <IconButton onClick={() => toggleLike(liked)}>
          <HeartIcon className={`${liked ? "text-red-500" : ""}`} />
        </IconButton>
        <span className="text-sm min-w-[20px]">
          {likesCount > 0 && likesCount}
        </span>
      </span>

      <IconButton>
        <Share1Icon />
      </IconButton>
      <div />
    </div>
  );
};
