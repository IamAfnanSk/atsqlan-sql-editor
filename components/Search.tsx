import { AiOutlineSearch, AiOutlineSortAscending } from 'react-icons/ai'

const Search: React.FC = () => {
	return (
		<div>
			<label
				htmlFor='search'
				className='block text-sm font-medium text-gray-700'
			>
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
						placeholder='Table name, etc'
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
		</div>
	)
}

export default Search
