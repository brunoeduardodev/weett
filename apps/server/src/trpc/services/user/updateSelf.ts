import { UpdateSelfInput } from "@weett/schemas";
import { AuthenticatedContext } from "../../context";

export const updateSelf = async (
  { name, bio, avatarUrl, bannerUrl }: UpdateSelfInput,
  { prisma, user }: AuthenticatedContext
) => {
  const profile = await prisma.user
    .update({
      where: { id: user.id },
      data: {
        profile: {
          update: {
            name,
            bio,
            avatarUrl,
            bannerUrl,
          },
        },
      },
    })
    .catch(console.error);

  return profile;
};
