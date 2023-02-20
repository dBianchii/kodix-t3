import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "../utils/api";

interface SessionProps {
  session: Session | null;
}

const Workspaces: React.FC = () => {
  const { data: session } = useSession();

  const [workspaceName, setWorkspaceName] = useState("");

  const ctx = api.useContext();
  const { mutate } = api.workspace.create.useMutation({
    onSuccess: () => {
      ctx.workspace.getAll.invalidate();
    },
  });

  function createWorkspace() {
    if (!session?.user?.id) return;

    mutate({
      userId: session?.user?.id,
      workspaceName,
    });
  }

  return (
    <div className="w-full max-w-xs">
      <form className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <div className="mb-4">
          <label
            className="text-gray-700 mb-2 block text-sm font-bold"
            htmlFor="workspaceName"
          >
            Workspace Name
          </label>
          <input
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="focus:shadow-outline text-gray-700 w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none"
            id="workspaceName"
            type="text"
            placeholder="Name"
          />
        </div>

        <button
          onClick={createWorkspace}
          className="focus:shadow-outline bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 font-bold text-white focus:outline-none"
          type="button"
        >
          Create
        </button>
        <WorkspacesTable {...{ session }} />
      </form>
    </div>
  );
};

const WorkspacesTable = ({ session }: SessionProps) => {
  if (!session?.user?.id) {
    return <></>;
  }

  const result = api.workspace.getAll.useQuery({
    userId: session?.user?.id,
  });

  const { mutateAsync } = api.user.switchActiveWorkspace.useMutation();

  return (
    <table className="mt-4 table-auto">
      <thead>
        <tr>
          <th>Your Workspaces</th>
        </tr>
      </thead>
      <tbody>
        {result.isLoading ? (
          <tr>
            <td>Loading...</td>
          </tr>
        ) : (
          result.data?.map((workspace) => (
            <tr
              key={workspace.id}
              className={
                workspace.id == session.user?.activeWorkspaceId
                  ? "bg-gray-200"
                  : ""
              }
            >
              <td>
                <div className="alert-del">
                  <button
                    onClick={async () =>
                      await mutateAsync({ workspaceId: workspace.id })
                    }
                  >
                    {workspace.name}
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Workspaces;
