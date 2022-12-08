import { Button } from "@weett/ui";
import dayjs from "dayjs";

type Props = {
  bannerUrl?: string;
  profileUrl?: string;

  name: string;
  handle: string;

  followersCount: number;
  followingCount: number;

  bio: string;
  createdAt: Date;

  onEditProfile: () => void;
};

export const ProfileBanner = ({
  name,
  handle,
  followersCount,
  followingCount,
  bio,
  createdAt,
  bannerUrl,
  profileUrl,
  onEditProfile,
}: Props) => {
  return (
    <div className="flex flex-col w-full">
      <div
        className={`flex h-40 w-full bg-slate-400 bg-cover bg-no-repeat bg-center`}
        style={{
          backgroundImage: bannerUrl ? `url('${bannerUrl}')` : undefined,
        }}
      />
      <div className="flex flex-col px-5">
        <div className="flex justify-between items-start ">
          <div className="flex flex-col -mt-14 gap-2">
            <img
              className="w-28 h-28 border-[6px] border-white rounded-full bg-slate-400 object-cover"
              src={profileUrl}
            ></img>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold capitalize">{name}</h3>
              <p className="text-gray-700">{handle}</p>
            </div>
          </div>

          <Button intent="primary" onClick={onEditProfile} className="mt-2">
            Edit Profile
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <p>{bio}</p>

          <p>Joined at {dayjs(createdAt).format("MMMM YYYY")}</p>

          <div className="flex gap-6">
            <p>{followersCount} Followers</p>
            <p>{followingCount} Following</p>
          </div>
        </div>
      </div>
    </div>
  );
};
