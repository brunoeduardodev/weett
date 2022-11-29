import { PropsWithChildren } from "react";

export const AuthenticationLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen bg-slate-100">
      <div className="p-6 w-[420px] space-y-3 flex flex-col bg-slate-200 shadow-md">
        {children}
      </div>
    </div>
  );
};
