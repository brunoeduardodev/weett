import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { RegisterForm } from "./RegisterForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AuthDialog = ({ isOpen, onClose }: Props) => {
  const [method, setMethod] = useState<"login" | "register">("register");

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.DialogOverlay className="bg-black bg-opacity-25 fixed inset-0 transition-colors ease-in-out duration-300" />
      <Dialog.Content className="bg-white rounded-sm shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-h-[85vh] max-w-lg p-6 animate-modal-open flex flex-col">
        <Dialog.Title className="font-bold text-lg text-center">
          {method === "login" ? "Sign In" : "Sign Up"}
        </Dialog.Title>

        <RegisterForm onClose={onClose} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
