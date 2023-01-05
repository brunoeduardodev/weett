import { useAuthentication } from "@/contexts/authentication";
import { useAuthenticationDialog } from "@/contexts/authenticationDialog";
import { useDisclosure } from "@/hooks/useDisclosure";
import {
  ChatBubbleIcon,
  HeartIcon,
  Share1Icon,
  Share2Icon,
} from "@radix-ui/react-icons";

import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@weett/server";
import { IconButton } from "@weett/ui";
import { ReactElement } from "react";
import { ReplyDialog } from "./ReplyDialog";
import { useTweetActions } from "./useTweetActions";

type Props = {
  type?: "compact" | "expanded";
  post: inferRouterOutputs<AppRouter>["feed"]["get"]["posts"][0];
};

type ActionProps = {
  Icon: ReactElement;
  count: number;
  type: "compact" | "expanded";
  onClick: () => void;
};

const Action = ({ Icon, count, onClick, type }: ActionProps) => {
  const { showLogin } = useAuthenticationDialog();
  const { isSigned } = useAuthentication();

  return (
    <div className="flex gap-2 items-center">
      <IconButton
        className={`${
          type === "compact" ? "w-8 h-8 text-base" : "w-10 h-10 text-xl"
        } `}
        onClick={(e) => {
          e.stopPropagation();

          if (!isSigned) {
            showLogin();
            return;
          }

          onClick();
        }}
      >
        {Icon}
      </IconButton>
      {type === "compact" && (
        <span className="text-sm min-w-[20px]">{count > 0 && count}</span>
      )}
    </div>
  );
};

export const TweetActions = ({ post, type = "compact" }: Props) => {
  const { liked, likesCount, toggleLike } = useTweetActions(post);
  const reply = useDisclosure();

  return (
    <div className="flex flex-col w-full">
      {type === "expanded" && (
        <div className="flex gap-2 w-full border-b border-t border-gray-300 py-3 text-sm">
          <p>
            <strong>0</strong> Retweets
          </p>
          <p>
            <strong>{likesCount}</strong> Likes
          </p>

          <p>
            <strong>{post.repliesCount}</strong> Replies
          </p>
        </div>
      )}
      <div
        className={`flex ${
          type === "compact" ? "justify-between" : "justify-around py-2"
        } w-full`}
      >
        <ReplyDialog
          isOpen={reply.isOpen}
          onClose={reply.onClose}
          post={post}
        />

        <Action
          Icon={<ChatBubbleIcon />}
          type={type}
          onClick={() => reply.onOpen()}
          count={post.repliesCount}
        />

        <Action
          Icon={<HeartIcon className={liked ? "text-red-500" : ""} />}
          type={type}
          onClick={() => toggleLike(liked)}
          count={likesCount}
        />

        <Action
          Icon={<Share2Icon />}
          type={type}
          onClick={() => {}}
          count={0}
        />
        <Action
          Icon={<Share1Icon />}
          type={type}
          onClick={() => {}}
          count={0}
        />
      </div>
    </div>
  );
};
