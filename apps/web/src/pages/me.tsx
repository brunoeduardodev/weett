import { NextPage } from "next";
import { WithLayout } from "../layouts/types";
import { trpc } from "../utils/trpc";

const Me: WithLayout<NextPage> = () => {
  const { data, isLoading, error } = trpc.user.me.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold">{data.name}</h1>
    </>
  );
};

Me.Layout = ({ children }) => <>{children}</>;

export default Me;
