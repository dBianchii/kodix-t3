import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,

  BriefcaseIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

const profilePic = [
  {
    name: 'Your workspaces',
    description: 'Create, and manage your workspaces',
    href: '/workspaces',
    icon: BriefcaseIcon,
  }
]
const callsToActionProfilePic = [
  //{ name: 'Settings', href: '#', icon: Cog6ToothIcon },
  { name: 'Log Out', href: '#', icon: ArrowLeftOnRectangleIcon }
]

function classNames(...classes: string[] ) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
	const { data: session } = useSession()

	const image = session?.user?.image

  	return (
    	<Popover className="relative bg-gray-800 shadow-xl">
      		<div className="mx-auto max-w-7xl px-4 sm:px-6">
      	  		<div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
      	    		<div className="flex justify-start lg:w-0 lg:flex-1">
      	    		  	<Link href="/">
							<span className="sr-only">Your Company</span>
      	    		    	<h3 className="text-lg text-blue-500">Kodix</h3>
      	    		  	</Link>
      	    		</div>
      	    		<div className="-my-2 -mr-2 md:hidden">
						<Popover.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
							<span className="sr-only">Open menu</span>
							<Bars3Icon className="h-6 w-6" aria-hidden="true" />
						</Popover.Button>
      	    		</div>
					<Popover.Group as="nav" className="hidden space-x-10 md:flex">
						<Link href="/marketplace" className="text-base font-medium text-gray-200 hover:text-gray-300">
      	        			Marketplace
      	      			</Link>
						{ session && (
							<Link href="/apps" className="text-base font-medium text-gray-200 hover:text-gray-300">
      	        				Apps
      	      				</Link>
						)}
					</Popover.Group>
      	    		<div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
					{
						image ? (
							<div>
								<Popover className="relative">
									{({ open }) => (
										<>
										<Popover.Button
											className={classNames(open ? 'text-gray-900' : 'text-gray-500', 'group inline-flex items-center rounded-md bg-gray-800 text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2')}>
											<Image className="w-10 h-10 rounded-full" src={image} alt="Rounded avatar" width={40} height={40}/>
										</Popover.Button>

										<Transition
											as={Fragment}
											enter="transition ease-out duration-200"
											enterFrom="opacity-0 translate-y-1"
											enterTo="opacity-100 translate-y-0"
											leave="transition ease-in duration-150"
											leaveFrom="opacity-100 translate-y-0"
											leaveTo="opacity-0 translate-y-1">

											<Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
												<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
													<div className="relative grid gap-6 bg-gray-700 px-5 py-6 sm:gap-8 sm:p-8">
													{profilePic.map((item) => (
														<a
														key={item.name}
														href={item.href}
														className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-600"
														>
														<item.icon className="h-6 w-6 flex-shrink-0 text-white" aria-hidden="true" />
														<div className="ml-4">
															<p className="text-base font-medium text-white">{item.name}</p>
															<p className="mt-1 text-sm text-gray-400">{item.description}</p>
														</div>
														</a>
													))}
													</div>
													<div className="space-y-6 bg-gray-700 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
													{callsToActionProfilePic.map((item) => (
														<div key={item.name} className="flow-root">
															<button
																className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-600"
																onClick={() => signOut()}
															>
																<item.icon className="h-6 w-6 flex-shrink-0 text-white" aria-hidden="true" />
																<span className="ml-3 text-white">{item.name}</span>
															</button>
														</div>
													))}
													</div>
												</div>
											</Popover.Panel>
										</Transition>
												
										</>
									)}
      	            			</Popover>
							</div>
						) : (
							<div>
								<Link href="/signIn" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
									Sign in
								</Link>
								<Link
									href="/signIn" className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
								Sign up
								</Link>
							</div>
						)

					}
      	    		</div>
      	  		</div>
      		</div>

     
    	</Popover>
	)
}
