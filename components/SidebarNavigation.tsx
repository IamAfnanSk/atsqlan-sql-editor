import { AiOutlineConsoleSql, AiOutlineInfo, AiOutlineLogout, AiOutlineTable } from 'react-icons/ai'
import { useWebsiteContext } from '../hooks/useWebsiteContext'
import { TSidebarLinks } from '../pages/global'

type TSidebarNavLink = {
	name: string
	icon: JSX.Element
	slug: TSidebarLinks
}

const Sidebar: React.FC = () => {
	const { selectedSidebar } = useWebsiteContext()

	const sidebarNavLinks: TSidebarNavLink[] = [
		{
			name: 'Query',
			icon: <AiOutlineConsoleSql />,
			slug: 'query'
		},
		{
			name: 'Tables',
			icon: <AiOutlineTable />,
			slug: 'tables'
		},
		{
			name: 'About',
			icon: <AiOutlineInfo />,
			slug: 'about'
		}
	]

	return (
		<aside className='pt-3 p-2 border-gray-100 w-[4.25rem] flex flex-col justify-between items-center'>
			<div className='w-full'>
				<h1 className='text-center hover:text-indigo-700 cursor-default font-bold'>SQL</h1>
				<div className='mt-3 space-y-1'>
					{sidebarNavLinks.map((link, index) => {
						const isSelected = selectedSidebar === link.slug

						return (
							<div key={index} className={`flex flex-col items-center cursor-pointer rounded-md py-2 hover:bg-gray-100 ${isSelected ? 'bg-gray-100' : ''}`}>
								<span className='text-2xl'>{link.icon}</span>
								<p className='text-xs px-2'>{link.name}</p>
							</div>
						)
					})}
				</div>
			</div>

			<div className='w-full'>
				<div className='flex flex-col items-center cursor-pointer rounded-md py-3 hover:bg-pink-50 hover:text-pink-700'>
					<span className='text-2xl'>
						<AiOutlineLogout />
					</span>
					<p className='text-xs px-2'>Logout</p>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar
