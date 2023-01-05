import Link from "next/link";
import { useTweetContent } from "./useTweetContent";

type Props = {
  content: string;
};

export const TweetContent = ({ content }: Props) => {
  const { contentGroups } = useTweetContent(content);

  return (
    <div className="inline-block">
      {contentGroups.map((group) => {
        if (group.type === "hashtag") {
          return (
            <Link
              key={group.id}
              href={`/hashtags/${group.value}`}
              className="text-blue-500 inline hover:underline"
            >
              #{group.value}
            </Link>
          );
        }

        if (group.type === "tag") {
          return (
            <Link
              key={group.id}
              href={`/${group.value}`}
              className="text-blue-500 inline hover:underline"
            >
              @{group.value}
            </Link>
          );
        }

        return (
          <p key={group.id} className="inline">
            {group.value}
          </p>
        );
      })}
    </div>
  );
};
