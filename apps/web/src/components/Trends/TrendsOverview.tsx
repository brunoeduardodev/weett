import { trpc } from "@/utils/trpc";

export const TrendsOverview = () => {
  const { data, isLoading, isError } = trpc.hashtags.getTending.useQuery({});

  if (isLoading || isError) return null;
  return (
    <section className="flex flex-col bg-gray-100 min-h-[420px] w-full p-4 gap-2">
      <p className="text-lg font-bold mb-2">Trending</p>

      <div className="flex flex-col gap-4">
        {data.map((hashtag) => (
          <div key={hashtag.id} className="flex flex-col gap-1">
            <p className="font-bold">{hashtag.name}</p>
            <p className="text-sm">{hashtag.count} Weets</p>
          </div>
        ))}
      </div>
    </section>
  );
};
