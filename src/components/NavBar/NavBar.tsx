import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Navbar: React.FunctionComponent = () => {
  	const [isOpen, setIsOpen] = useState(false);
	const { data: session } = useSession()

  	return (
    	<nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-purple-700 to-purple-800 p-6">
			<div className="flex items-center flex-shrink-0 text-white mr-6">
				<svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
				<Link href="/">
					<span className="font-semibold text-xl tracking-tight">Kodix</span>
				</Link>
			</div>
			<div className="block lg:hidden">
				<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
				<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
				</button>
			</div>
		
    	  	<div className={`w-full ${isOpen ? "block" : "hidden"} lg:flex lg:items-center lg:w-auto`}>
    	  	  	<div className="text-sm lg:flex-grow">
					<Link href="/pricing" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
    	  	  	    	Pricing
    	  	  	  	</Link>
    	  	  	</div>
				{
					session?.user?.image ? (
						<div>	
							<Image className="w-10 h-10 rounded-full" src={session?.user?.image?.toString()} alt="Rounded avatar" width={40} height={40}/>
						</div>
					) : (
						<div>
    	  	  		 	 <Link href="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sign In</Link>
    	  	  			</div>
					)
				}
    	  	</div>
    	</nav>
  	);
};

export default Navbar;


export function NavBar(){
	return (
		<>
			<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
			  <div className="container flex flex-wrap items-center justify-between mx-auto">
			    <Link href="/" className="flex items-center">
			        <Image src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" width="200" height="200"/>
			        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
			    </Link>
			    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
			      <span className="sr-only">Open main menu</span>
			      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
			    </button>
			    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
			      <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
			        <li>
			          <Link href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</Link>
			        </li>
			        <li>
			          <Link href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
			        </li>
			        <li>
			          <Link href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</Link>
			        </li>
			        <li>
			          <Link href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</Link>
			        </li>
			        <li>
			          <Link href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</Link>
			        </li>
			      </ul>
			    </div>
			  </div>
			</nav>
		</>
	)
}