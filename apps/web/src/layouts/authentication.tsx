import { PropsWithChildren } from "react";

export const AuthenticationLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen bg-white">
      <div className="p-6 w-[420px] space-y-3 flex flex-col shadow-lg">
        {children}
      </div>
    </div>
  );
};
