import { GetTrendingInput } from "@weett/schemas";
import { Context } from "../../context";

export const getTrending = async (
  { limit }: GetTrendingInput,
  { prisma }: Context
) => {
  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

  const yesterday = new Date(new Date().getTime() - ONE_DAY_IN_MS);

  const topUsages = await prisma.hashtagUsage.groupBy({
    by: ["hashtagId"],
    _count: { hashtagId: true },
    where: { usedAt: { gt: yesterday } },
    orderBy: { _count: { hashtagId: "desc" } },
    take: limit,
  });

  const hashtags = await prisma.hashtag.findMany({
    where: { id: { in: topUsages.map((usage) => usage.hashtagId) } },
  });

  const orderedHashtagsWithCount = topUsages
    .map((usage) => {
      const hashtag = hashtags.find(
        (hashtag) => hashtag.id === usage.hashtagId
      );
      if (!hashtag) throw new Error("Found usage without creation");

      return {
        count: usage._count.hashtagId,
        ...hashtag,
      };
    })
    .sort((a, b) => b.count - a.count);

  return orderedHashtagsWithCount;
};
