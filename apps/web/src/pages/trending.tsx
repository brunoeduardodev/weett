import { trpc } from "@/utils/trpc";
import { NextPage } from "next";
import Link from "next/link";

const TrendingPage: NextPage = () => {
  const {
    data: trends,
    error,
    isLoading,
  } = trpc.hashtags.getTending.useQuery();

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error: {error}</>;

  return (
    <main className="flex flex-col gap-8">
      <h1 className="text-xl font-bold">Trending Now</h1>

      <div className="flex flex-col">
        {trends.map((hashtag) => (
          <Link
            href={`hashtags/${encodeURIComponent(hashtag.name.slice(1))}`}
            className="flex flex-col gap-1 hover:bg-gray-100 p-2 rounded transition-colors"
            key={hashtag.id}
          >
            <p className="font-bold">{hashtag.name}</p>
            <p className="text-sm">{hashtag.count} Weets</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default TrendingPage;
