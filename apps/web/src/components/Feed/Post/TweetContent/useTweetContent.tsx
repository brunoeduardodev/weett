const tagExpression = /((?:#|@)[a-z]+)/;

export const useTweetContent = (content: string) => {
  const groups = content.split(tagExpression);

  const groupsWithType = groups.map((word) => {
    if (word.startsWith("#")) {
      return {
        type: "hashtag",
        value: word.slice(1),
      };
    }

    if (word.startsWith("@")) {
      return {
        type: "hashtag",
        value: word.slice(1),
      };
    }

    return {
      type: "text",
      value: word,
    };
  });

  return groupsWithType;
};
