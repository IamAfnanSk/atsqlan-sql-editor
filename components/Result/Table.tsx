/* eslint-disable react/jsx-key */
import { Column, useSortBy, useTable } from 'react-table'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import React, { useEffect, useMemo, useState } from 'react'
import { copyToClipboard, LIMIT_FOR_ROWS, SQLQueries } from '../../global'
import { BsFullscreen, BsArrowCounterclockwise } from 'react-icons/bs'
import { GrDocumentCsv } from 'react-icons/gr'
import { TbLayoutColumns, TbLayoutRows } from 'react-icons/tb'
import { VscJson } from 'react-icons/vsc'
import { useWebsiteContext } from '../../hooks/useWebsiteContext'

type TProps = {
	columns: Column[]
	data: any[]
	timeToResult: number
}

const Table: React.FC<TProps> = ({ columns: columnsData, data: rowsData, timeToResult: timeTaken }) => {
	const [dataToProcess, setDataToProcess] = useState(rowsData)
	const [limitResults, setLimitResults] = useState(true)

	const timeToResult = useMemo(() => timeTaken, [timeTaken])

	const columns = useMemo(() => columnsData, [columnsData])
	const data = useMemo(() => dataToProcess, [dataToProcess])

	const { selectedQueryIndex } = useWebsiteContext()

	const { headerGroups, rows, prepareRow, getTableProps, getTableBodyProps } = useTable(
		{
			columns,
			data
		},
		useSortBy
	)

	useEffect(() => {
		if (limitResults) {
			setDataToProcess(rowsData.slice(0, LIMIT_FOR_ROWS))
		} else {
			setDataToProcess(rowsData)
		}
	}, [limitResults, rowsData])

	const fScreenHandle = useFullScreenHandle()

	return (
		<div className='p-4 h-full w-full flex space-y-2 flex-col'>
			<div className='overflow-scroll relative rounded-lg'>
				<FullScreen className={`${fScreenHandle.active ? 'overflow-scroll' : ''}`} handle={fScreenHandle}>
					<table {...getTableProps()} className='divide-y divide-gray-300 text-left'>
						<thead className='bg-white'>
							{headerGroups.map((headerGroup) => (
								<tr {...headerGroup.getHeaderGroupProps()} className='divide-x divide-gray-200'>
									{headerGroup.headers.map((column) => (
										<th
											{...column.getHeaderProps((column as any).getSortByToggleProps())}
											scope='col'
											className='sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-4 py-1.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter table-cell'
										>
											<p className='flex items-center space-x-2'>
												<span>{column.render('Header')}</span>
												<span>{(column as any).isSorted ? (column as any).isSortedDesc ? <FaSortDown /> : <FaSortUp /> : <FaSort />}</span>
											</p>
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()} className='divide-y divide-gray-200 bg-white'>
							{rows.map((row) => {
								prepareRow(row)
								return (
									<tr {...row.getRowProps()} className='divide-x divide-gray-200'>
										{row.cells.map((cell) => {
											return (
												<td className='whitespace-nowrap px-4 py-1.5 text-sm text-gray-500' {...cell.getCellProps()}>
													{cell.render('Cell')}
												</td>
											)
										})}
									</tr>
								)
							})}
						</tbody>
					</table>
				</FullScreen>
			</div>

			<div className='flex justify-between items-center'>
				<div className='flex items-center space-x-2'>
					<div>
						<div onClick={() => fScreenHandle.enter()} className={`cursor-pointer text-xs py-1 px-2 flex justify-center items-center bg-white shadow-sm rounded-md`}>
							<p className='mr-1'>Fullscreen</p>
							<BsFullscreen />
						</div>
					</div>

					{rowsData.length > 50 && (
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
						<p className='text-sm'>{rows.length}</p>
						{limitResults && <p className='text-sm'> out of {rowsData.length}</p>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default React.memo(Table)
