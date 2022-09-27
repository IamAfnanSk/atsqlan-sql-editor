import {
	AiOutlineConsoleSql,
	AiOutlineLogout,
	AiOutlineTable
} from 'react-icons/ai'
import { CgDatabase } from 'react-icons/cg'

const Sidebar: React.FC = () => {
	return (
		<aside className='pt-3 border-gray-100 w-20 flex flex-col justify-between items-center'>
			<div className='w-full'>
				<h1 className='text-center hover:text-indigo-700 cursor-default font-bold'>
					SQL
				</h1>
				<div className='mt-3'>
					<div className='flex flex-col items-center cursor-pointer py-3 hover:bg-indigo-50'>
						<AiOutlineConsoleSql className='text-2xl' />
						<p className='text-xs'>Query</p>
					</div>
					<div className='flex flex-col items-center cursor-pointer py-3 hover:bg-indigo-50'>
						<AiOutlineTable className='text-2xl' />
						<p className='text-xs'>Tables</p>
					</div>
					<div className='flex flex-col items-center cursor-pointer py-3 hover:bg-indigo-50'>
						<CgDatabase className='text-2xl' />
						<p className='text-xs'>Databases</p>
					</div>
				</div>
			</div>

			<div className='w-full'>
				<div className='flex flex-col items-center cursor-pointer py-3 hover:bg-red-50 hover:text-red-700'>
					<AiOutlineLogout className='text-2xl' />
					<p className='text-xs'>Logout</p>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar
