import { AiOutlineSearch, AiOutlineSortAscending } from 'react-icons/ai'
import { CgDatabase } from 'react-icons/cg'

const DatabaseTables: React.FC = () => {
	return (
		<div>
			<label htmlFor='search' className='block text-sm font-medium text-gray-700'>
				Search
			</label>

			<div className='mt-1 flex rounded-md shadow-sm'>
				<div className='relative flex items-stretch flex-grow focus-within:z-10'>
					<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
						<AiOutlineSearch className='text-lg' />
					</div>
					<input
						type='text'
						name='search'
						id='search'
						className='focus:ring-0  block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-none outline-none'
						placeholder='Table name'
					/>
				</div>
				<button
					type='button'
					className='-ml-px relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none'
				>
					<AiOutlineSortAscending className='text-lg' />
					<span>Sort</span>
				</button>
			</div>

			<div className='mt-3 space-y-1 pt-2 border-t'>
				{Array(15)
					.fill(null)
					.map((_, index) => {
						return (
							<div className='px-3 flex items-center py-0.5 hover:bg-white rounded-md cursor-pointer' key={index}>
								<CgDatabase className='flex-shrink-0' />
								<p className='text-sm ml-2 truncate'>DUMMY_TABLE_{index + 1}</p>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default DatabaseTables
