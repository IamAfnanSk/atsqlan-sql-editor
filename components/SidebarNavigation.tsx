import { AiOutlineConsoleSql, AiOutlineDatabase, AiOutlineLogout, AiOutlineTable } from 'react-icons/ai'

type SidebarNavLink = {
	name: string
	icon: JSX.Element
}

const Sidebar: React.FC = () => {
	const sidebarTopLinks: SidebarNavLink[] = [
		{
			name: 'Query',
			icon: <AiOutlineConsoleSql />
		},
		{
			name: 'Tables',
			icon: <AiOutlineTable />
		},
		{
			name: 'DBs',
			icon: <AiOutlineDatabase />
		}
	]

	const sidebarBottomLinks: SidebarNavLink[] = [
		{
			name: 'Logout',
			icon: <AiOutlineLogout />
		}
	]

	return (
		<aside className='pt-3 p-2 border-gray-100 w-[4.25rem] flex flex-col justify-between items-center'>
			<div className='w-full'>
				<h1 className='text-center hover:text-indigo-700 cursor-default font-bold'>SQL</h1>
				<div className='mt-3'>
					{sidebarTopLinks.map((link, index) => {
						return (
							<div key={index} className='flex flex-col items-center cursor-pointer rounded-md py-3 hover:bg-gray-100'>
								<span className='text-2xl'>{link.icon}</span>
								<p className='text-xs px-2'>{link.name}</p>
							</div>
						)
					})}
				</div>
			</div>

			<div className='w-full'>
				{sidebarBottomLinks.map((link, index) => {
					return (
						<div key={index} className='flex flex-col items-center cursor-pointer rounded-md py-3 hover:bg-pink-50 hover:text-pink-700'>
							<span className='text-2xl'>{link.icon}</span>
							<p className='text-xs px-2'>{link.name}</p>
						</div>
					)
				})}
			</div>
		</aside>
	)
}

export default Sidebar
