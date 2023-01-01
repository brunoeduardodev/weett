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
import { useAuthentication } from "@/contexts/authentication";
import { useAuthenticationDialog } from "@/contexts/authenticationDialog";
import { Handle } from "@/components/Handle";
import Link from "next/link";
import { consts } from "@/config/consts";
import { TweetActions } from "./TweetActions";

type Props = {
  post: inferRouterOutputs<AppRouter>["feed"]["get"]["posts"][0];
};

dayjs.extend(relativeTime);

export const Post = ({ post }: Props) => {
  const fromNow = dayjs(post.createdAt).fromNow();

  return (
    <article className="p-4 flex gap-4 items-start ">
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
        <p>{post.content}</p>

        <TweetActions post={post} />
      </div>
    </article>
  );
};
