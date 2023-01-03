export const getHashtagsFromMessage = (message: string) => {
  const hashtagsExpression = /#\w+/g;
  const results: string[] = [];

  let result: RegExpExecArray | null;
  while ((result = hashtagsExpression.exec(message))) {
    if (results.indexOf(result[0]) !== -1) continue;

    results.push(result[0]);
  }

  return results;
};
