import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { ProfileHeader } from "./ProfileHeader";

export const Profile = () => {
  const router = useRouter();
  const { data, isLoading, isError } = trpc.user.me.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <main className="flex flex-col">
      <ProfileHeader
        name={data.name}
        tweetCount={89}
        onBack={() => router.back()}
      />
    </main>
  );
};
