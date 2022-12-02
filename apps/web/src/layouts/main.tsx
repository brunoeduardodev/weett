import { PropsWithChildren } from "react";
import { Sidebar } from "../components/Sidebar";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col p-4 flex-1">{children}</div>
    </div>
  );
};