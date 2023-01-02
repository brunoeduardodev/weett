export const getHashtagsFromMessage = (message: string) => {
  const hashtagsExpression = /#\w+/g;
  const results: string[] = [];

  let result: RegExpExecArray | null;
  while ((result = hashtagsExpression.exec(message))) {
    results.push(result[0]);
  }

  return results;
};
