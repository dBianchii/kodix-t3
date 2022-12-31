import { type NextPage } from "next";
import Head from "next/head";

import { signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Link from "next/link";

const Home: NextPage = () => {
  const { data } = trpc.technology.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Kodix <span className="text-[hsl(280,100%,70%)]">-- The</span> App
          </h1>

          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {data?.map((tech) => tech.name).join(", ")}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <Link
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        href={sessionData ? "" : "/signIn"}
        onClick={sessionData ? () => signOut() : () => null}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Link>
    </div>
  );
};
