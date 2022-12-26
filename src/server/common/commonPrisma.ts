//This file should be used to export commonly used prisma queries
export async function getWorkspace(workspaceId: string){
	return prisma?.workspace.findUnique({
		where: {
			id: workspaceId
		}
	})
}
