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
import { MouseEventHandler, useCallback, useState } from "react";
import { trpc } from "@/utils/trpc";
import { useAuthentication } from "@/contexts/authentication";
import { useAuthenticationDialog } from "@/contexts/authenticationDialog";
import { Handle } from "@/components/Handle";
import Link from "next/link";
import { consts } from "@/config/consts";
import { TweetActions } from "../../Post/TweetActions";
import { TweetContent } from "../../Post/TweetContent";
import { useRouter } from "next/router";

type Props = {
  post: inferRouterOutputs<AppRouter>["feed"]["get"]["posts"][0];
};

dayjs.extend(relativeTime);

export const FeedPost = ({ post }: Props) => {
  const fromNow = dayjs(post.createdAt).fromNow();
  const router = useRouter();

  const handleClick = useCallback<MouseEventHandler>(
    ({ currentTarget, target }) => {
      const isDiv = target instanceof HTMLDivElement;
      const isP = target instanceof HTMLParagraphElement;
      if (target !== currentTarget && !isDiv && !isP) return;

      router.push(`${post.author.handle}/weet/${post.id}`);
    },
    [router, post]
  );

  const handleEnter = useCallback<React.KeyboardEventHandler>(
    ({ target, currentTarget, key }) => {
      if (key !== "Enter") return;
      if (target !== currentTarget) return;

      router.push(`${post.author.handle}/weet/${post.id}`);
    },
    [router, post]
  );

  return (
    <article
      tabIndex={0}
      className="py-6 px-4 flex gap-4 items-start focus:bg-gray-100 focus:outline-blue-500 focus:outline focus-within:bg-gray-100 hover:bg-gray-100 cursor-pointer transition-colors rounded"
      onClick={handleClick}
      onKeyDown={handleEnter}
    >
      <Link
        href={`/${post.author.handle}`}
        aria-label={post.author.profile.name}
        className="bg-black rounded-full"
      >
        <img
          className="w-12 h-12 rounded-full bg-gray-400 filter hover:opacity-75 transition object-cover"
          alt={`${post.author.profile.name}'s avatar`}
          src={post.author.profile.avatarUrl || consts.DEFAULT_PROFILE}
        />
      </Link>

      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-4">
          <Link
            href={`/${post.author.handle}`}
            className="font-bold hover:underline"
          >
            {post.author.profile.name}
          </Link>
          <Handle handle={post.author.handle} />
          <p className="text-gray-500" title={post.createdAt.toLocaleString()}>
            {fromNow}
          </p>
        </div>

        <TweetContent content={post.content} />
        <TweetActions post={post} />
      </div>
    </article>
  );
};
