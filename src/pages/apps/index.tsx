import type { App } from "@prisma/client"
import { type NextPage } from "next/types"
import AppComponent from "../../components/App/App"
import { trpc } from "../../utils/trpc"

const Apps: NextPage = () => {
	
	const data = trpc.app.getInstalledApps.useQuery()
	if (data.isLoading){
		return <div>Loading...</div>
	}

	if (!data.data){
		return <div>Error</div>
	} 

	return (
		<div className="flex min-h-screen flex-row bg-gradient-to-b from-[#2e026d] to-[#15162c]">
			<div className="mx-10 my-4">
				{data.data.map((app: App) =>(
					<div key={app.id}>
						<AppComponent appName={app.name} appDescription={app.description} installed={true}/>
					</div>
				))}
			</div>
		</div>
	)
}

export default Apps