import { AutoUploadImageField } from "@/components/AutoUploadImageField";
import { useZodForm } from "@/hooks/useZodForm";
import { trpc } from "@/utils/trpc";
import * as Dialog from "@radix-ui/react-dialog";
import { UpdateSelfInput, updateSelfSchema } from "@weett/schemas";
import { Button, TextField } from "@weett/ui";
import { useCallback, useEffect } from "react";
import { Controller } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const EditProfileDialog = ({ isOpen, onClose }: Props) => {
  const userQuery = trpc.user.me.useQuery();
  const utils = trpc.useContext();
  const updateSelfMutation = trpc.user.updateSelf.useMutation({
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      utils.user.me.invalidate();
      onClose();
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useZodForm({ schema: updateSelfSchema });

  const handleReset = useCallback(() => {
    reset({
      name: userQuery.data?.profile.name,
      bio: userQuery.data?.profile.bio || "",
      avatarUrl: userQuery.data?.profile.avatarUrl ?? undefined,
      bannerUrl: userQuery.data?.profile.bannerUrl ?? undefined,
    });
  }, [
    userQuery.data?.profile.name,
    userQuery.data?.profile.bio,
    userQuery.data?.profile.avatarUrl,
    userQuery?.data?.profile.bannerUrl,
    reset,
  ]);

  useEffect(() => {
    handleReset();
  }, [handleReset]);

  const handleUpdate = useCallback((data: UpdateSelfInput) => {
    updateSelfMutation.mutate(data);
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.DialogOverlay className="bg-black bg-opacity-25 fixed inset-0 transition-colors ease-in-out duration-300 z-50" />
      <Dialog.Content className="bg-white rounded-sm shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-h-[85vh] max-w-lg p-6 animate-modal-open flex flex-col z-50">
        <Dialog.Title className="font-bold text-lg text-center">
          Edit Profile
        </Dialog.Title>

        {userQuery.isLoading ? (
          <div>Loading...</div>
        ) : (
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="space-y-4 items-center flex flex-col"
          >
            <TextField
              id="name"
              label="Name"
              placeholder="John Doe"
              error={errors.name?.message}
              {...register("name")}
            />

            <Controller
              control={control}
              name="avatarUrl"
              render={({ field }) => (
                <AutoUploadImageField
                  endpoint="profile-picture"
                  id="avatar"
                  label="Avatar"
                  kind="circle"
                  name={field.name}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />

            <Controller
              control={control}
              name="bannerUrl"
              render={({ field }) => (
                <AutoUploadImageField
                  endpoint="banner"
                  id="banner"
                  label="Banner"
                  kind="rectangle"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <TextField
              id="bio"
              label="Bio"
              placeholder="Bio"
              error={errors.bio?.message}
              {...register("bio")}
            />

            <Button intent="primary" isLoading={updateSelfMutation.isLoading}>
              Save Profile
            </Button>
            <Button type={"button"} intent="secondary" onClick={handleReset}>
              Reset
            </Button>
          </form>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};
