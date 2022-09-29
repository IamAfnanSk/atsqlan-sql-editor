import { FullScreenHandle } from 'react-full-screen'
import { BsFullscreen, BsArrowCounterclockwise } from 'react-icons/bs'
import { TbLayoutColumns, TbLayoutRows } from 'react-icons/tb'
import { LIMIT_FOR_ROWS } from '../../global'

type TProps = {
	fScreenHandle: FullScreenHandle
	timeToResult: number
	limitResults: boolean
	setLimitResults: React.Dispatch<React.SetStateAction<boolean>>
	columnsLength: number
	filteredRowsLength: number
	allRowsLength: number
}

const TableFooterWithOptions: React.FC<TProps> = ({ fScreenHandle, limitResults, setLimitResults, timeToResult, allRowsLength, columnsLength, filteredRowsLength }) => {
	return (
		<div className='flex justify-between items-center'>
			<div className='flex items-center space-x-2'>
				<div>
					<div onClick={() => fScreenHandle.enter()} className={`cursor-pointer text-xs space-x-2 py-1 px-2 flex justify-center items-center bg-white shadow-sm rounded-md`}>
						<p className='mr-1'>Fullscreen</p>
						<BsFullscreen />
					</div>
				</div>
				<div>
					<div className='relative flex items-start'>
						<div className='flex items-center h-5'>
							<input
								checked={limitResults}
								onChange={() => setLimitResults((limitResults) => !limitResults)}
								id='limitResults'
								name='limitResults'
								type='checkbox'
								className='ring-0 cursor-pointer focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>
						<div className='ml-2 text-sm'>
							<label htmlFor='limitResults' className='select-none cursor-pointer'>
								Show first {LIMIT_FOR_ROWS} records only
							</label>
						</div>
					</div>
				</div>
			</div>

			<div className='flex items-center space-x-2'>
				<div className='flex items-center space-x-1'>
					<BsArrowCounterclockwise />
					<p className='text-sm'>{timeToResult}s</p>
				</div>
				<div className='flex items-center space-x-1'>
					<TbLayoutColumns />
					<p className='text-sm'>{columnsLength}</p>
				</div>
				<div className='flex items-center space-x-1'>
					<TbLayoutRows />
					<p className='text-sm'>{filteredRowsLength}</p>
					{limitResults && <p className='text-sm'> out of {allRowsLength}</p>}
				</div>
			</div>
		</div>
	)
}

export default TableFooterWithOptions
