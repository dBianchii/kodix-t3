import type { App } from "@prisma/client";
import AppComponent from "../components/App/App";
import { api } from "../utils/api";

export default function Apps() {
  const data = api.app.getInstalledApps.useQuery();
  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  if (!data.data) {
    return <div>Error</div>;
  }

  return (
    <div className="flex min-h-screen flex-row bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="mx-10 my-4">
        {data.data.map((app: App) => (
          <div key={app.id}>
            <AppComponent
              appName={app.name}
              appDescription={app.description}
              installed={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
