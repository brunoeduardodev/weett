import { NextPage } from "next";
import { Button } from "../../components/buttons/Button";
import { TextField } from "../../components/Inputs/TextField";
import { AuthenticationLayout } from "../../layouts/authentication";
import { WithLayout } from "../../layouts/types";

const RegisterPage: WithLayout<NextPage> = () => {
  return (
    <>
      <h2 className="text-slate-900 font-bold text-lg text-center">
        Create Account
      </h2>

      <form className="space-y-4 items-center flex flex-col">
        <TextField
          id="email"
          label="Email"
          type="email"
          placeholder="john@doe.com"
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          placeholder="******"
        />

        <Button variant="primary">Register</Button>
      </form>
    </>
  );
};

RegisterPage.Layout = AuthenticationLayout;

export default RegisterPage;
