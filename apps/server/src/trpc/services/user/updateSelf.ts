import { UpdateSelfInput } from "@weett/schemas";
import { AuthenticatedContext } from "../../context";

export const updateSelf = async (
  { name, bio, avatarUrl, bannerUrl }: UpdateSelfInput,
  { prisma, user }: AuthenticatedContext
) => {
  const profile = await prisma.profile.update({
    where: { id: user.id },
    data: {
      name,
      bio,
      avatarUrl,
      bannerUrl,
    },
  });

  return profile;
};
