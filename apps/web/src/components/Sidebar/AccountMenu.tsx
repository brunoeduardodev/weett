import { useRouter } from "next/router";
import { useAuthentication } from "@/contexts/authentication";
import * as Menu from "../Menu";

type Props = {
  name: string;
  handle: string;
  avatarUrl?: string;
};

export const AccountMenu = ({ name, handle, avatarUrl }: Props) => {
  const router = useRouter();
  const { signOut } = useAuthentication();

  return (
    <Menu.Root>
      <Menu.Trigger>
        <div className="flex gap-4 rounded-md hover:bg-gray-50">
          <img
            className="w-12 h-12 rounded-full bg-gray-300 object-cover"
            src={avatarUrl}
          />
          <div className="flex flex-col">
            <p className="text-lg">{name}</p>
            <p>{handle}</p>
          </div>
        </div>
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Content>
          <Menu.Item onSelect={() => router.push("/me")}>Profile</Menu.Item>
          <Menu.Item onSelect={signOut}>Sign out</Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
};
