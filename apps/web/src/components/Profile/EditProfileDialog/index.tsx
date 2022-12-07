import { useZodForm } from "@/hooks/useZodForm";
import { trpc } from "@/utils/trpc";
import * as Dialog from "@radix-ui/react-dialog";
import { UpdateSelfInput, updateSelfSchema } from "@weett/schemas";
import { Button, TextField } from "@weett/ui";
import { useCallback, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const EditProfileDialog = ({ isOpen, onClose }: Props) => {
  const userQuery = trpc.user.me.useQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useZodForm({ schema: updateSelfSchema });

  const handleReset = useCallback(() => {
    reset({
      name: userQuery.data?.profile.name,
      bio: userQuery.data?.profile.bio || "",
    });
  }, [userQuery.data]);

  useEffect(() => {
    handleReset();
  }, [handleReset]);

  const handleUpdate = useCallback((data: UpdateSelfInput) => {
    console.log(data);
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.DialogOverlay className="bg-black bg-opacity-25 fixed inset-0 transition-colors ease-in-out duration-300" />
      <Dialog.Content className="bg-white rounded-sm shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-h-[85vh] max-w-lg p-6 animate-modal-open flex flex-col">
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

            <TextField
              id="bio"
              label="Bio"
              placeholder="Bio"
              error={errors.bio?.message}
              {...register("bio")}
            />

            <Button intent="primary">Save Profile</Button>
            <Button type={"button"} intent="secondary" onClick={handleReset}>
              Reset
            </Button>
          </form>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};
