import { PropsWithChildren } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TrendsOverview } from "@/components/Trends/TrendsOverview";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col p-4 pl-[320px] xl:pr-[320px] w-full">
        {children}
      </div>
      <div className="hidden xl:flex flex-col p-4 w-[320px] min-h-screen fixed right-0 top-0">
        <h3 className="text-2xl font-bold mb-4">Trending</h3>
        <TrendsOverview />
      </div>
    </div>
  );
};
