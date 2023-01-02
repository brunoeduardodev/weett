import { useMemo } from "react";

const tagExpression = /((?:#|@)[a-z]+)/;

const getGroupWithType = (
  group: string
): {
  id: string;
  value: string;
  type: "hashtag" | "tag" | "text";
} => {
  const id = crypto.randomUUID();

  if (group.startsWith("#")) {
    return {
      id,
      type: "hashtag",
      value: group.slice(1),
    };
  }

  if (group.startsWith("@")) {
    return {
      id,
      type: "tag",
      value: group.slice(1),
    };
  }

  return {
    id,
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
