import { trpc } from "@/utils/trpc";
import { NextPage } from "next";
import { useRouter } from "next/router";

const WeetPage: NextPage = () => {
  const { weet: weetId } = useRouter().query;
  if (!weetId || Array.isArray(weetId)) return null;

  const {
    data: weet,
    isLoading,
    error,
  } = trpc.post.get.useQuery({ postId: weetId });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return <h1>{weet.author.handle}</h1>;
};

export default WeetPage;
