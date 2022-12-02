import * as Menu from "../Menu";

type Props = {
  user: {
    handle: string;
    name: string;
  };
};

export const AccountMenu = ({ user }: Props) => {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <div className="flex gap-4 rounded-md">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <div className="flex flex-col">
            <p className="text-lg">{user.name}</p>
            <p>{user.handle}</p>
          </div>
        </div>
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Content>
          <Menu.Item>Profile</Menu.Item>
          <Menu.Item>Sign out</Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
};
