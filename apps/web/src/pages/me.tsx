import { NextPage } from "next";
import { Profile } from "@/components/Profile";
import { trpc } from "@/utils/trpc";

const Me: NextPage = () => {
  const { data, isLoading, error } = trpc.user.me.useQuery();

  if (isLoading) return <>{"Loading..."}</>;

  if (error) return <>{`Error: ${error}`}</>;

  return (
    <>
      <Profile user={data} />
    </>
  );
};

export default Me;
