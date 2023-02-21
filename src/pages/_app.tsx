import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import type { ReactNode } from "react";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";
import NavBar from "../components/NavBar/NavBar";

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
      <ChakraProvider>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </ChakraProvider>
    </SessionProvider>
  );
};

function Layout({ children }: { children?: ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default api.withTRPC(MyApp);
