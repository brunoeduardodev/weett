import "../styles/globals.css";

import { AppType } from "next/app";
import { TRPCProvider } from "../contexts/trpc";
import { hasLayout } from "../layouts/types";
import { AuthenticationProvider } from "../contexts/authentication";
import { MainLayout } from "../layouts/main";
import { AuthenticationDialogProvider } from "../contexts/authenticationDialog";

const App: AppType = ({ Component, pageProps }) => {
  let Layout = MainLayout;

  if (hasLayout(Component)) {
    Layout = Component.Layout;
  }

  return (
    <TRPCProvider>
      <AuthenticationProvider>
        <AuthenticationDialogProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthenticationDialogProvider>
      </AuthenticationProvider>
    </TRPCProvider>
  );
};

export default App;
