import Image from "next/image";

type Props = {
  appName: string
  appDescription: string
  installed: boolean
}

const KodixApp: React.FC<Props> = ({ appName, appDescription, installed = false }) => {
	return (

		<div className="bg-gray-700 font-semibold text-center rounded-3xl shadow-xl p-5 max-w-sm">
			<Image width={20} height={20} className="mb-3 w-20 h-20 rounded-full shadow-lg mx-auto" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="product designer"/>
			<h1 className="text-lg text-gray-200">{appName}</h1>
			<p className="text-xs text-gray-400 mt-4">{appDescription}</p>
			<button className="hover:bg-gray-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold tracking-wide">{ installed ? "Open App" : "Install"}</button>
		</div>

	)

}

export default KodixApp