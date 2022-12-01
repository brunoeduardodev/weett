import "../styles/globals.css";

import { AppType } from "next/app";
import { TRPCProvider } from "../contexts/trpc";
import { PropsWithChildren } from "react";
import { hasLayout } from "../layouts/types";
import { AuthenticationProvider } from "../contexts/authentication";
import { MainLayout } from "../layouts/main";

const App: AppType = ({ Component, pageProps }) => {
  let Layout = MainLayout;

  if (hasLayout(Component)) {
    Layout = Component.Layout;
  }

  return (
    <TRPCProvider>
      <AuthenticationProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthenticationProvider>
    </TRPCProvider>
  );
};

export default App;
