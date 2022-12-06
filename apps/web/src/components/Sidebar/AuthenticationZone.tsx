import { Button } from "@weett/ui/";

type Props = {
  onLogin: () => void;
  onRegister: () => void;
};

export const AuthenticationZone = ({ onLogin, onRegister }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Button intent="primary" onClick={onLogin}>
        Login
      </Button>
      <Button onClick={onRegister} intent="secondary">
        Sign Up
      </Button>
    </div>
  );
};
