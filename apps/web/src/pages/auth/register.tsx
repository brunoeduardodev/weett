import { useForm } from "react-hook-form";
import { Button } from "../../components/buttons/Button";
import { TextField } from "../../components/Inputs/TextField";
import { AuthenticationLayout } from "../../layouts/authentication";
import { WithLayout } from "../../layouts/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { UserSignupInput, userSignupSchema } from "@weett/schemas";

const RegisterPage: WithLayout<NextPage> = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<UserSignupInput>({
    resolver: zodResolver(userSignupSchema),
  });

  const router = useRouter();

  const {
    isLoading,
    error: signUpError,
    mutate: signUp,
  } = trpc.userSignup.useMutation({
    onSuccess: (data) => {
      console.log({ data });
      router.replace("/");
    },
  });

  const handleRegister = useCallback(
    (data: UserSignupInput) => {
      signUp(data);
    },
    [signUp]
  );

  return (
    <>
      <h2 className="text-slate-900 font-bold text-lg text-center">
        Create Account
      </h2>

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

        {signUpError && (
          <p className="text-red-500 font-bold text-sm">
            {signUpError.message}
          </p>
        )}
      </form>
    </>
  );
};

RegisterPage.Layout = AuthenticationLayout;

export default RegisterPage;
