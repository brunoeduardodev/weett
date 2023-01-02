import { useMemo } from "react";

const tagExpression = /((?:#|@)[a-z]+)/;

const getGroupWithType = (
  group: string
): {
  value: string;
  type: "hashtag" | "tag" | "text";
} => {
  if (group.startsWith("#")) {
    return {
      type: "hashtag",
      value: group.slice(1),
    };
  }

  if (group.startsWith("@")) {
    return {
      type: "hashtag",
      value: group.slice(1),
    };
  }

  return {
    type: "text",
    value: group,
  };
};

export const useTweetContent = (content: string) => {
  const contentGroups = useMemo(() => {
    const groups = content.split(tagExpression);
    const groupsWithType = groups.map(getGroupWithType);

    return groupsWithType;
  }, [content]);

  return {
    contentGroups,
  };
};
