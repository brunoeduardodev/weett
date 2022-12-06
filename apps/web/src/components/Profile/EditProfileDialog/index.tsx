import * as Dialog from "@radix-ui/react-dialog";
import { Button, TextField } from "@weett/ui";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const EditProfileDialog = ({ isOpen, onClose }: Props) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.DialogOverlay className="bg-black bg-opacity-25 fixed inset-0 transition-colors ease-in-out duration-300" />
      <Dialog.Content className="bg-white rounded-sm shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-h-[85vh] max-w-lg p-6 animate-modal-open flex flex-col">
        <Dialog.Title className="font-bold text-lg text-center">
          Edit Profile
        </Dialog.Title>

        <form className="space-y-4 items-center flex flex-col">
          <TextField id="name" label="Name" placeholder="John Doe" />

          <TextField id="handle" label="Handle" placeholder="@JohnDoe" />

          <TextField
            id="email"
            label="Email"
            type="email"
            placeholder="john@doe.com"
          />

          <Button intent="primary">Edit</Button>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
