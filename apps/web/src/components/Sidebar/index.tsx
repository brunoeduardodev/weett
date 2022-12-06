import { useAuthentication } from "@/contexts/authentication";
import { useAuthenticationDialog } from "@/contexts/authenticationDialog";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { AuthDialog } from "../AuthDialog";
import { AccountMenu } from "./AccountMenu";
import { AuthenticationZone } from "./AuthenticationZone";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  const { user } = useAuthentication();
  const { showLogin, showRegister } = useAuthenticationDialog();

  const router = useRouter();

  const isItemActive = useCallback(
    (href: string) => {
      return router.pathname === href;
    },
    [router.pathname]
  );

  return (
    <div className="flex flex-col h-screen fixed w-[320px] justify-between p-4">
      <ul className="flex flex-col gap-2 items-start">
        <h1 className="px-4 font-bold text-xl mb-6">Something Cool</h1>

        <SidebarItem href={"/"} isActive={isItemActive("/")}>
          Feed
        </SidebarItem>
        <SidebarItem href={"/trending"} isActive={isItemActive("/trending")}>
          Trending
        </SidebarItem>

        {user && (
          <SidebarItem href={"/me"} isActive={isItemActive("/me")}>
            Profile
          </SidebarItem>
        )}
      </ul>

      <AuthDialog />

      {user ? (
        <AccountMenu user={user} />
      ) : (
        <AuthenticationZone onLogin={showLogin} onRegister={showRegister} />
      )}
    </div>
  );
};
