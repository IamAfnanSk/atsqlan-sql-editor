import Papa from 'papaparse'
import { useEffect, useMemo, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { BiError } from 'react-icons/bi'
import { BsFullscreen, BsArrowCounterclockwise } from 'react-icons/bs'
import { GrDocumentCsv } from 'react-icons/gr'
import { TbLayoutColumns, TbLayoutRows } from 'react-icons/tb'
import { VscJson } from 'react-icons/vsc'
import { Column } from 'react-table'
import { copyToClipboard, LIMIT_FOR_ROWS, SQLQueries } from '../../global'
import { useWebsiteContext } from '../../hooks/useWebsiteContext'
import { errorNotification } from '../../utils/toast'
import Table from './Table'

const ResultsArea: React.FC = () => {
	const { queryState, selectedQueryIndex, setQueryState } = useWebsiteContext()

	const [columns, setColumns] = useState<Column[]>([])
	const [data, setData] = useState<any[]>([])

	const [limitResults, setLimitResults] = useState(true)
	const [timeToResult, setTimeToResult] = useState<number>(0)

	const fScreenHandle = useFullScreenHandle()

	const memoizedColumns = useMemo(() => columns, [columns])
	const memoizedData = useMemo(() => {
		if (limitResults) {
			return data.slice(0, LIMIT_FOR_ROWS)
		} else {
			return data
		}
	}, [limitResults, data])

	useEffect(() => {
		if (queryState === 'running') {
			const fetchData = async () => {
				try {
					const startTime = Date.now()
					const rawData = await (await fetch(SQLQueries[selectedQueryIndex].dataURL)).text()
					const data = Papa.parse<any>(rawData).data

					const columns = data[0].map((col: string) => {
						return {
							Header: col,
							accessor: col.split(' ').join('_').toLowerCase()
						}
					})

					// Last parsed array item is empty
					data.pop()

					const rows = data.slice(1).map((row: string[]) => {
						return row.reduce((acc: any, curr, index: number) => {
							acc[columns[index].accessor] = curr
							return acc
						}, {})
					})

					setColumns(columns)
					setData(rows)

					setQueryState('success')

					const endTime = Date.now()
					const secondsTakenToShowTable = (endTime - startTime) / 1000
					setTimeToResult(secondsTakenToShowTable)
				} catch (error) {
					console.log(error)
					setQueryState('error')
				}
			}
			fetchData()
		}

		if (queryState === 'error') {
			errorNotification('Something went wrong executing the query :(')
		}
	}, [queryState, selectedQueryIndex, setQueryState])

	return (
		<>
			{queryState === 'idle' && (
				<div className='h-full w-full flex flex-col items-center justify-center'>
					<AiOutlinePlayCircle className='text-4xl' />
					<p className='text-lg mt-3'>
						Click on <span className='font-bold'>&apos;Run&apos;</span> from top right area to execute the query
					</p>
				</div>
			)}

			{queryState === 'running' && (
				<div className='h-full w-full flex flex-col items-center justify-center'>
					<div className='animate-ping rounded-full bg-gray-900 w-5 h-5'></div>
					<p className='text-lg mt-3'>Executing query please wait</p>
				</div>
			)}

			{queryState === 'success' && (
				<FullScreen className={`p-4 h-full w-full flex space-y-2 flex-col ${fScreenHandle.active ? 'bg-gray-100' : ''}`} handle={fScreenHandle}>
					<Table columns={memoizedColumns} data={memoizedData} />

					<div className='flex justify-between items-center'>
						<div className='flex items-center space-x-2'>
							<div>
								<div
									onClick={() => {
										if (fScreenHandle.active) {
											fScreenHandle.exit()
										} else {
											fScreenHandle.enter()
										}
									}}
									className={`cursor-pointer text-xs py-1 px-2 flex justify-center items-center bg-white shadow-sm rounded-md`}
								>
									<p className='mr-1'>{fScreenHandle.active && 'Exit'} Fullscreen</p>
									<BsFullscreen />
								</div>
							</div>

							{data.length > 50 && (
								<div>
									<div className='flex items-start'>
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
							)}
						</div>

						<div className='flex items-center space-x-2'>
							<a
								href={SQLQueries[selectedQueryIndex].dataURL}
								target='_blank'
								className={`cursor-pointer text-xs py-1 px-2 flex justify-center items-center bg-white shadow-sm rounded-md`}
								rel='noreferrer'
							>
								<p className='mr-1'>Download</p>
								<GrDocumentCsv />
							</a>

							<div
								onClick={() => {
									copyToClipboard(JSON.stringify(data), 'JSON data copied to clipboard')
								}}
								className={`cursor-pointer text-xs py-1 px-2 flex justify-center items-center bg-white shadow-sm rounded-md`}
							>
								<p className='mr-1'>Copy</p>
								<VscJson />
							</div>
						</div>

						<div className='flex items-center space-x-2'>
							<div className='flex items-center space-x-1'>
								<BsArrowCounterclockwise />
								<p className='text-sm'>{timeToResult}s</p>
							</div>
							<div className='flex items-center space-x-1'>
								<TbLayoutColumns />
								<p className='text-sm'>{columns.length}</p>
							</div>
							<div className='flex items-center space-x-1'>
								<TbLayoutRows />
								<p className='text-sm'>{memoizedData.length}</p>
								{limitResults && <p className='text-sm'> out of {data.length}</p>}
							</div>
						</div>
					</div>
				</FullScreen>
			)}

			{queryState === 'error' && (
				<div className='h-full w-full flex flex-col items-center justify-center'>
					<BiError className='text-4xl' />
					<p className='text-lg mt-3'>Ops! Some error occoured, Please try running a different query or check your network.</p>
				</div>
			)}
		</>
	)
}

export default ResultsArea
