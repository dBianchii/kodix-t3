import { useSession } from "next-auth/react";
import type { App } from "@prisma/client";
import AppComponent from "../components/App/App";
import type { AppWithInstalled } from "../server/api/routers/apps";
import { api } from "../utils/api";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = () => {
  let result: App[] | AppWithInstalled[] = [];
  if (!session) {
    const { data } = api.app.getAll.useQuery();
    if (data) result = data;
  } else {
    const { data } = api.app.getAllWithInstalled.useQuery();
    if (data) result = data;
  }

  return {
    props: {
      result,
    },
  };
};

export default function Marketplace(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <div className="flex min-h-screen flex-row bg-gray-800 bg-gradient-to-b">
      <div className="mx-10 my-4">
        {props.result.map((app) => (
          <div key={app.id}>
            <AppComponent
              appName={app.name}
              appDescription={app.description}
              installed={"installed" in app ? app.installed : false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
