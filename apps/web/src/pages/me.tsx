import { NextPage } from "next";
import { WithLayout } from "../layouts/types";

export const Me: WithLayout<NextPage> = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">You</h1>
    </>
  );
};

Me.Layout = ({ children }) => <>{children}</>;
