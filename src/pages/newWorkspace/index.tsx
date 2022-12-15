import { useSession } from "next-auth/react"
import Link from "next/link";
import { type NextPage } from "next/types"
import { useState } from "react";
import { trpc } from "../../utils/trpc"



const WorkspacesTable = () => {

	const result = trpc.workspace.getAll.useQuery()
	
		
	return (

		<table className="table-auto mt-4">
			<thead>
				<tr>
					<th>Your Workspaces</th>
				</tr>
			</thead>
			<tbody>
				{
				result.isLoading ? 
					<tr>
						<td>Loading...</td>
					</tr>
					:
				result.data?.map((workspace) => (
					<tr key={workspace.id}>
						<td>{workspace.name}</td>
						<div className="alert-del"></div>
					</tr>
				))
				
				}
			</tbody>
		</table>
	)
			
		
	
}


const CreateWorkspace = () => {
	const { data: session } = useSession();

	const [workspaceName, setWorkspaceName] = useState("");

	const ctx = trpc.useContext()
	const { mutate } = trpc.workspace.create.useMutation({
		onSuccess: () => {
			ctx.workspace.getAll.invalidate()
		}
	})

	function createWorkspace() {
		if (!session?.user?.id)
			return

		mutate({
			userId: session?.user?.id,
			workspaceName
		})
	}

	return (
		<div className="w-full max-w-xs">
  			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  			  	<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workspaceName">
						Workspace Name
					</label>
					<input onChange={(e) => setWorkspaceName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="workspaceName" type="text" placeholder="Name"/>
  			  	</div>
  			  
  			  	<button onClick={createWorkspace} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
					Create
				</button>
				<WorkspacesTable/>
  			</form>
  			
			
		</div>
		
		
	)
}

export default CreateWorkspace