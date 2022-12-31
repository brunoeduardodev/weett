const hashtagsExpression = /#\w/g;

export const getHashtagsFromMessage = (message: string) => {
  const results = hashtagsExpression.exec(message);
  if (!results) return [];

  return Array.from(results);
};
