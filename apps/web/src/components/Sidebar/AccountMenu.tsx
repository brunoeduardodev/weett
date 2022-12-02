import { useRouter } from "next/router";
import { useAuthentication } from "../../contexts/authentication";
import * as Menu from "../Menu";

type Props = {
  user: {
    handle: string;
    name: string;
  };
};

export const AccountMenu = ({ user }: Props) => {
  const router = useRouter();
  const { signOut } = useAuthentication();

  return (
    <Menu.Root>
      <Menu.Trigger>
        <div className="flex gap-4 rounded-md hover:bg-gray-50">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <div className="flex flex-col">
            <p className="text-lg">{user.name}</p>
            <p>{user.handle}</p>
          </div>
        </div>
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Content>
          <Menu.Item onSelect={() => router.push("/profile")}>
            Profile
          </Menu.Item>
          <Menu.Item onSelect={signOut}>Sign out</Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
};
