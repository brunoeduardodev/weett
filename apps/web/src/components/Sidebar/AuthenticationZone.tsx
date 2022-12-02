import { Button } from "../buttons/Button";

type Props = {
  onLogin: () => void;
  onRegister: () => void;
};

export const AuthenticationZone = ({ onLogin, onRegister }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Button variant="primary" onClick={onLogin}>
        Login
      </Button>
      <Button onClick={onRegister} variant="secondary">
        Sign Up
      </Button>
    </div>
  );
};
