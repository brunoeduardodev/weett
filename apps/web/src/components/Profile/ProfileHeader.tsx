import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { IconButton } from "@weett/ui";

type Props = {
  name: string;
  tweetCount: number;
  onBack: () => void;
};

export const ProfileHeader = ({ name, tweetCount, onBack }: Props) => {
  return (
    <div className="flex gap-5">
      <IconButton onClick={onBack} className={"w-12 h-12"}>
        <ArrowLeftIcon className="w-8 h-8" />
      </IconButton>

      <div className="flex flex-col">
        <h3 className="text-lg font-bold capitalize">{name}</h3>
        <p className="text-gray-700">{tweetCount} tweets</p>
      </div>
    </div>
  );
};
