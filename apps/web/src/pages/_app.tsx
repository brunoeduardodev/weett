import "../styles/globals.css";

import { AppType } from "next/app";
import { TRPCProvider } from "../contexts/trpc";
import { PropsWithChildren } from "react";
import { hasLayout } from "../layouts/types";

const App: AppType = ({ Component, pageProps }) => {
  let Layout = ({ children }: PropsWithChildren) => <>{children}</>;

  if (hasLayout(Component)) {
    Layout = Component.Layout;
  }

  return (
    <TRPCProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TRPCProvider>
  );
};

export default App;
