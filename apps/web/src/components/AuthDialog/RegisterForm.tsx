import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignupInput, userSignupSchema } from "@weett/schemas";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../../contexts/authentication";
import { trpc } from "../../utils/trpc";
import { Button } from "../buttons/Button";
import { TextButton } from "../buttons/TextButton";
import { TextField } from "../inputs/TextField";

type Props = {
  onClose: () => void;
  showLogin: () => void;
};

export const RegisterForm = ({ onClose, showLogin }: Props) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<UserSignupInput>({
    resolver: zodResolver(userSignupSchema),
  });

  const { authenticate } = useAuthentication();

  const {
    isLoading,
    error: signUpError,
    mutate: signUp,
  } = trpc.userSignup.useMutation({
    onSuccess: ({ token }) => {
      authenticate(token);
      onClose();
    },
  });

  const handleRegister = useCallback(
    (data: UserSignupInput) => {
      signUp(data);
    },
    [signUp]
  );

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
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
        id="handle"
        label="Handle"
        placeholder="@JohnDoe"
        error={errors.handle?.message}
        {...register("handle")}
      />

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

      <Button isLoading={isLoading} variant="primary">
        Register
      </Button>

      <p className="flex gap-2">
        Already have an account?{" "}
        <TextButton onClick={showLogin}>Sign In</TextButton>
      </p>

      {signUpError && (
        <p className="text-red-500 font-bold text-sm">{signUpError.message}</p>
      )}
    </form>
  );
};
