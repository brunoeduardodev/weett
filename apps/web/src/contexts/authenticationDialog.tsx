import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { useDisclosure } from "@/hooks/useDisclosure";

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

export const useAuthenticationDialog = () => {
  const context = useContext(AuthenticationDialogContext);

  if (!context) {
    throw new Error(
      "useAuthenticationDialog must be used within AuthenticationDialogProvider"
    );
  }

  return context;
};
