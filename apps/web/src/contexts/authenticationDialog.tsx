import { createContext, PropsWithChildren, useCallback, useState } from "react";
import { useDisclosure } from "../hooks/useDisclosure";

type AuthenticationDialog = {
  isOpen: boolean;
  currentMethod: "login" | "register";

  showLogin: () => void;
  showRegister: () => void;

  close: () => void;
};

const AuthenticationDialogContext = createContext<AuthenticationDialog | null>(
  null
);

export const AuthenticationDialogProvider = ({
  children,
}: PropsWithChildren) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [currentMethod, setCurrentMethod] = useState<"login" | "register">(
    "login"
  );

  const showLogin = useCallback(() => {
    setCurrentMethod("login");
    onOpen();
  }, []);

  const showRegister = useCallback(() => {
    setCurrentMethod("register");
    onOpen();
  }, []);

  return (
    <AuthenticationDialogContext.Provider
      value={{
        showLogin,
        showRegister,
        close: onClose,

        isOpen,
        currentMethod,
      }}
    >
      {children}
    </AuthenticationDialogContext.Provider>
  );
};

export {};
