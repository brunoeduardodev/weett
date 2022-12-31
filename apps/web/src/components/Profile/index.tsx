import { useAuthentication } from "@/contexts/authentication";
import { useDisclosure } from "@/hooks/useDisclosure";
import { trpc } from "@/utils/trpc";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@weett/server";
import { useRouter } from "next/router";
import { FeedRenderer } from "../Feed/FeedContent";
import { EditProfileDialog } from "./EditProfileDialog";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileHeader } from "./ProfileHeader";

type Props = {
  user: NonNullable<inferRouterOutputs<AppRouter>["user"]["getUser"]>;
};

export const Profile = ({ user }: Props) => {
  const { user: currentUser } = useAuthentication();

  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <main className="flex flex-col gap-2">
      <ProfileHeader
        name={user.profile.name}
        tweetCount={89}
        onBack={() => router.back()}
      />
      <ProfileBanner
        name={user.profile.name}
        handle={user.handle}
        createdAt={user.createdAt}
        profileUrl={user.profile.avatarUrl || undefined}
        bannerUrl={user.profile.bannerUrl || undefined}
        followersCount={169}
        followingCount={400}
        onEditProfile={onOpen}
        canEdit={currentUser?.id === user.id}
        bio={user.profile.bio || ""}
      />

      {currentUser?.id === user.id && (
        <EditProfileDialog isOpen={isOpen} onClose={onClose} />
      )}

      <div className="flex w-full h-[1px] bg-gray-400 my-3" />

      <FeedRenderer authorId={user.id} />
    </main>
  );
};
