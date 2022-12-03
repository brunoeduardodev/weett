import { useState } from "react";
import { useAuthentication } from "../../contexts/authentication";
import { useAuthenticationDialog } from "../../contexts/authenticationDialog";
import { AuthDialog } from "../AuthDialog";
import { AccountMenu } from "./AccountMenu";
import { AuthenticationZone } from "./AuthenticationZone";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  const { user } = useAuthentication();
  const { showLogin, showRegister } = useAuthenticationDialog();

  return (
    <div className="flex flex-col h-screen fixed w-[320px] justify-between p-4">
      <ul className="flex flex-col gap-2 items-start">
        <h1 className="px-4 font-bold text-xl mb-6">Something Cool</h1>

        <SidebarItem href={"/"} isActive={true}>
          Feed
        </SidebarItem>
        <SidebarItem href={"/trending"} isActive={false}>
          Trending
        </SidebarItem>
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
