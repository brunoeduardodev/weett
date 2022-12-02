type Props = {
  user: {
    handle: string;
    name: string;
  };
};

export const AccountMenu = ({ user }: Props) => {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-300"></div>
      <div className="flex flex-col">
        <p className="text-lg">{user.name}</p>
        <p>{user.handle}</p>
      </div>
    </div>
  );
};
