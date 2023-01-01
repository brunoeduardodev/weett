type Props = {
  content: string;
};

export const TweetContent = ({ content }: Props) => {
  return <p>{content}</p>;
};
