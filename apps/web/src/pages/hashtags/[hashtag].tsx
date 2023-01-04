import { FeedRenderer } from "@/components/Feed/FeedContent";
import { NextPage } from "next";
import { useRouter } from "next/router";

const HashtagPage: NextPage = () => {
  const { query } = useRouter();
  const hashtag = query.hashtag as string;

  if (!hashtag) return null;
  return <FeedRenderer search={{ hashtags: ["#" + hashtag] }} />;
};

export default HashtagPage;
