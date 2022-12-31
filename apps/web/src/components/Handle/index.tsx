import Link from "next/link";

type Props = {
  handle: string;
};

export const Handle = ({ handle }: Props) => {
  return (
    <Link href={`/${handle}`} className="text-gray-700">
      @{handle}
    </Link>
  );
};
