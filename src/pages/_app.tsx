import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import PageHeader from "~/components/PageHeader";
import { Html } from "next/document";
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      {/* <Html lang="en" data-theme="dark"> */}
      <PageHeader />
      <Navbar />
      <Component {...pageProps} />
      {/* </Html> */}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
