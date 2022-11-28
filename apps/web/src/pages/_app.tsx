import { AppType } from "next/app";
import { TRPCProvider } from "../contexts/trpc";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <TRPCProvider>
      <Component {...pageProps} />
    </TRPCProvider>
  );
};

export default App;
