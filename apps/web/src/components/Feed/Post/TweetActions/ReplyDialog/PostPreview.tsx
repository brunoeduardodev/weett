import { Handle } from "@/components/Handle";
import { consts } from "@/config/consts";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@weett/server";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Link from "next/link";

type Props = {
  post: inferRouterOutputs<AppRouter>["feed"]["get"]["posts"][0];
};

dayjs.extend(relativeTime);

export const PostPreview = ({ post }: Props) => {
  const fromNow = dayjs(post.createdAt).fromNow();

  return (
    <div className="flex gap-3">
      <div className="flex flex-col justify-between items-center flex-shrink-0">
        <img
          src={post.author.profile.avatarUrl || consts.DEFAULT_PROFILE}
          alt={`${post.author.profile.name}'s avatar`}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1 flex w-0.5 my-1 bg-gray-300" />
      </div>

      <div className="flex flex-col items-start gap-2 w-full text-sm pb-2">
        <div className="flex gap-1">
          <p className="font-bold">{post.author.profile.name}</p>
          <Handle handle={post.author.handle} />
          <p className="text-gray-600">{fromNow}</p>
        </div>

        <p className="pb-3">{post.content}</p>
        <p>
          Replying to{" "}
          <Link
            href={`/${post.author.handle}`}
            className="text-blue-500 hover:underline"
          >
            @{post.author.handle}
          </Link>
        </p>
      </div>
    </div>
  );
};
