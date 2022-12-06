import { useDisclosure } from "@/hooks/useDisclosure";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { FeedRenderer } from "../Feed/FeedContent";
import { EditProfileDialog } from "./EditProfileDialog";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileHeader } from "./ProfileHeader";

export const Profile = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
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
        onEditProfile={onOpen}
        description={"brazilian fullstack developer"}
      />

      <EditProfileDialog isOpen={isOpen} onClose={onClose} />

      <div className="flex w-full h-[1px] bg-gray-400 my-3" />

      <FeedRenderer authorId={data.id} />
    </main>
  );
};