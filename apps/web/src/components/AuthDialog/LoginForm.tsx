import { LoginInput, loginSchema } from "@weett/schemas";
import { useCallback } from "react";
import { useAuthentication } from "@/contexts/authentication";
import { trpc } from "@/utils/trpc";
import { Button, TextButton, TextField } from "@weett/ui";
import { useZodForm } from "@/hooks/useZodForm";

type Props = {
  onClose: () => void;
  showRegister: () => void;
};

export const LoginForm = ({ onClose, showRegister }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useZodForm({
    schema: loginSchema,
  });

  const { authenticate } = useAuthentication();

  const {
    isLoading,
    error: loginError,
    mutate: login,
  } = trpc.authentication.login.useMutation({
    onSuccess: ({ token }) => {
      authenticate(token);
      onClose();
    },
  });

  const handleLogin = useCallback(
    (data: LoginInput) => {
      login(data);
    },
    [login]
  );

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="space-y-4 items-center flex flex-col"
    >
      <TextField
        id="email"
        label="Email"
        type="email"
        error={errors.email?.message}
        placeholder="john@doe.com"
        {...register("email")}
      />

      <TextField
        id="password"
        label="Password"
        type="password"
        placeholder="******"
        error={errors.password?.message}
        {...register("password")}
      />

      <Button isLoading={isLoading} intent="primary">
        Login
      </Button>

      <p className="flex gap-2">
        Doesn&apos;t have an account?
        <TextButton onClick={showRegister}>Register</TextButton>
      </p>

      {loginError && (
        <p className="text-red-500 font-bold text-sm">{loginError.message}</p>
      )}
    </form>
  );
};
