import { trpc } from "@/utils/trpc";
import Link from "next/link";

export const TrendsOverview = () => {
  const { data, isLoading, isError } = trpc.hashtags.getTending.useQuery({});

  if (isLoading || isError) return null;
  return (
    <section className="flex flex-col bg-gray-100 min-h-[420px] pt-4 w-full">
      <p className="text-lg font-bold mb-2 px-4">Trending</p>

      <div className="flex flex-col">
        {data.map((hashtag) => (
          <Link
            href={`/hashtags/${encodeURIComponent(hashtag.name.slice(1))}`}
            key={hashtag.id}
            className="flex flex-col gap-1 hover:bg-gray-200 transition-colors px-4 p-2"
          >
            <p className="font-bold">{hashtag.name}</p>
            <p className="text-sm">{hashtag.count} Weets</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
