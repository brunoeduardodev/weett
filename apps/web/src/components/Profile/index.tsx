import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { FeedContent } from "../Feed/FeedContent";
import { ProfileBanner } from "./ProfileBanner";
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
    <main className="flex flex-col gap-2">
      <ProfileHeader
        name={data.name}
        tweetCount={89}
        onBack={() => router.back()}
      />
      <ProfileBanner
        name={data.name}
        handle={data.handle}
        createdAt={data.createdAt}
        followersCount={169}
        followingCount={400}
        onEditProfile={console.log}
        description={"brazilian fullstack developer"}
      />

      <div className="flex w-full h-[1px] bg-gray-400 my-3" />

      <FeedContent authorId={data.id} />
    </main>
  );
};
