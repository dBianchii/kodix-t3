import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import { api } from "../utils/api";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}) => {
  const routesLayoutNotNeeded = ["/signIn", "/newUser"];

  const isLayoutNotNeeded = !routesLayoutNotNeeded.includes(
    (appProps.router as { pathname: string }).pathname
  );
  const LayoutComponent = isLayoutNotNeeded ? Layout : React.Fragment;
  return (
    <SessionProvider session={session}>
      <LayoutComponent>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </LayoutComponent>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
