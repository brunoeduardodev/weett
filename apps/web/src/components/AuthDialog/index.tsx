import * as Dialog from "@radix-ui/react-dialog";
import { useAuthenticationDialog } from "@/contexts/authenticationDialog";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const AuthDialog = () => {
  const { isOpen, close, currentMethod, showLogin, showRegister } =
    useAuthenticationDialog();

  return (
    <Dialog.Root open={isOpen} onOpenChange={close}>
      <Dialog.DialogOverlay className="bg-black bg-opacity-25 fixed inset-0 transition-colors ease-in-out duration-300 z-50" />
      <Dialog.Content className="bg-white rounded-sm shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-h-[85vh] max-w-lg p-6 animate-modal-open flex flex-col z-50">
        <Dialog.Title className="font-bold text-lg text-center">
          {currentMethod === "login" ? "Sign In" : "Sign Up"}
        </Dialog.Title>

        {currentMethod === "login" ? (
          <LoginForm onClose={close} showRegister={showRegister} />
        ) : (
          <RegisterForm onClose={close} showLogin={showLogin} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};
