import { FeedContent } from "./FeedContent";
import { NewTweet } from "./NewTweet";

export const Feed = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="font-bold text-2xl">Feed</h1>
      <NewTweet />

      <FeedContent />
    </div>
  );
};
