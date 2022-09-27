import {
	AiOutlineConsoleSql,
	AiOutlineDatabase,
	AiOutlineLogout,
	AiOutlineTable
} from 'react-icons/ai'

const Sidebar: React.FC = () => {
	return (
		<aside className='pt-3 p-2 border-gray-100 flex flex-col justify-between items-center'>
			<div className='w-full'>
				<h1 className='text-center hover:text-indigo-700 cursor-default font-bold'>
					SQL
				</h1>
				<div className='mt-3'>
					<div className='flex flex-col items-center cursor-pointer rounded-md py-3 hover:bg-gray-100'>
						<AiOutlineConsoleSql className='text-2xl' />
						<p className='text-xs px-2'>Query</p>
					</div>
					<div className='flex flex-col items-center cursor-pointer rounded-md py-3 hover:bg-gray-100'>
						<AiOutlineTable className='text-2xl' />
						<p className='text-xs px-2'>Tables</p>
					</div>
					<div className='flex flex-col items-center cursor-pointer rounded-md py-3 hover:bg-gray-100'>
						<AiOutlineDatabase className='text-2xl' />
						<p className='text-xs px-2'>DBs</p>
					</div>
				</div>
			</div>

			<div className='w-full'>
				<div className='flex flex-col items-center cursor-pointer rounded-md py-3 hover:bg-pink-50 hover:text-pink-700'>
					<AiOutlineLogout className='text-2xl' />
					<p className='text-xs px-2'>Logout</p>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar
