import { consts } from "@/config/consts";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@weett/server";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Link from "next/link";
import { Handle } from "../../Handle";
import { TweetContent } from "../../Post/TweetContent";
import { TweetActions } from "../../Post/TweetActions";
import { Reply } from "./Reply";
import { FeedPost } from "@/components/Feed/FeedPost";

type Props = {
  post: inferRouterOutputs<AppRouter>["post"]["get"];
};

dayjs.extend(relativeTime);

export const DetailedPost = ({ post }: Props) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/${post.author.handle}`}>
            <img
              src={post.author.profile.avatarUrl || consts.DEFAULT_PROFILE}
              alt={`${post.author.profile.name}'s avatar`}
              className="w-12 h-12 rounded-full bg-gray-400 filter hover:opacity-75 transition object-cover"
            />
          </Link>

          <div className="flex flex-col">
            <Link
              href={`/${post.author.handle}`}
              className="font-bold hover:underline"
            >
              {post.author.profile.name}
            </Link>
            <Handle handle={post.author.handle} />
          </div>
        </div>
      </div>

      <TweetContent content={post.content} />

      <p className="text-gray-600">{dayjs(post.createdAt).fromNow()}</p>

      <TweetActions post={post} type="expanded" />

      <Reply postId={post.id} />

      <div className="flex-col gap-2 divide-y divide-gray-300">
        {post.replies.map((reply) => (
          <FeedPost post={reply} />
        ))}
      </div>
    </div>
  );
};
