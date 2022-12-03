import { Fragment } from "react";
import { trpc } from "../../utils/trpc";

export const FeedContent = () => {
  const { data, isFetching, fetchNextPage } =
    trpc.feed.getFeed.useInfiniteQuery(
      {
        limit: 20,
      },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  return (
    <div className="flex flex-col space-y-4 divide-y-4 divide-gray-50">
      {data?.pages.map((page) => (
        <Fragment key={page.nextCursor}>
          {page.posts.map((post) => (
            <div key={post.id} className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold">{post.author.name}</h3>
                  <p>@{post.author.handle}</p>
                </div>

                <p className="text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
              <p>{post.content}</p>
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
};
