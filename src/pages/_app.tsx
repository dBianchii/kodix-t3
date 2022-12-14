import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import React from "react";
import { routesLayoutNotNeeded } from "./layoutNotNeeded";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }, ...appProps
}) => {
	const isLayoutNotNeeded = !routesLayoutNotNeeded.includes(appProps.router.pathname);
    const LayoutComponent = isLayoutNotNeeded ? Layout : React.Fragment;
  	return (
		<SessionProvider session={session}>
			<LayoutComponent>
				<Component {...pageProps} />
			</LayoutComponent>
		</SessionProvider>
  	);
};

export default trpc.withTRPC(MyApp);
