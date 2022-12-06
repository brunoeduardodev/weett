import { Fragment } from "react";
import { trpc } from "../../utils/trpc";
import { Post } from "./Post";

type Props = {
  authorId?: string;
};

export const FeedContent = ({ authorId }: Props) => {
  const { data } = trpc.feed.get.useInfiniteQuery(
    {
      limit: 20,
      authorId,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <div className="flex flex-col space-y-4 divide-y-4 divide-gray-50">
      {data?.pages.map((page) => (
        <Fragment key={page.nextCursor}>
          {page.posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Fragment>
      ))}
    </div>
  );
};
