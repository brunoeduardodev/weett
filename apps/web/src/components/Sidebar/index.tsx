import Link from "next/link";
import { useState } from "react";
import { useAuthentication } from "../../contexts/authentication";
import { AuthDialog } from "../AuthDialog";
import { Profile } from "./Profile";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  const { user } = useAuthentication();
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen min-w-[320px] justify-between p-4">
      <ul className="flex flex-col gap-2 items-start">
        <h1 className="px-4 font-bold text-xl mb-6">Something Cool</h1>

        <SidebarItem href={"/"} isActive={true}>
          Feed
        </SidebarItem>
        <SidebarItem href={"/trending"} isActive={false}>
          Trending
        </SidebarItem>
      </ul>

      <AuthDialog isOpen={isOpen} onClose={() => setOpen(false)} />

      {user ? (
        <Profile user={user} />
      ) : (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-500 text-center text-white rounded-full px-4 py-2"
          >
            Login
          </button>
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-500 text-center text-white rounded-full px-4 py-2"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};
