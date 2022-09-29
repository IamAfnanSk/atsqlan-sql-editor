/* eslint-disable react/jsx-key */
import { useSortBy, useTable } from 'react-table'
import { BsArrowCounterclockwise, BsFullscreen } from 'react-icons/bs'
import { TbLayoutRows, TbLayoutColumns } from 'react-icons/tb'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import React, { useMemo } from 'react'

type TProps = {
	columns: any
	data: any
	timeToResult: number
}

const Table: React.FC<TProps> = ({ columns: columnsData, data: rowsData, timeToResult: timeTaken }) => {
	const columns = useMemo(() => columnsData, [columnsData])
	const data = useMemo(() => rowsData, [rowsData])
	const timeToResult = useMemo(() => timeTaken, [timeTaken])

	const { headerGroups, rows, prepareRow, getTableProps, getTableBodyProps } = useTable(
		{
			columns,
			data
		},
		useSortBy
	)

	const fScreenHandle = useFullScreenHandle()

	return (
		<div className='p-4 h-full w-full flex justify-between flex-col'>
			<div
				className='relative w-full overflow-scroll rounded-lg'
				style={{
					height: 'calc(100% - 2rem)'
				}}
			>
				<FullScreen className='overflow-scroll' handle={fScreenHandle}>
					<table {...getTableProps()} className='divide-y absolute w-full h-full divide-gray-300 text-left'>
						<thead className='bg-white'>
							{headerGroups.map((headerGroup) => (
								<tr {...headerGroup.getHeaderGroupProps()} className='divide-x divide-gray-200'>
									{headerGroup.headers.map((column) => (
										<th
											{...column.getHeaderProps(column.getSortByToggleProps())}
											scope='col'
											className='sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-4 py-1.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell'
										>
											<p className='flex items-center space-x-2'>
												<span>{column.render('Header')}</span>
												<span>{column.isSorted ? column.isSortedDesc ? <FaSortDown /> : <FaSortUp /> : <FaSort />}</span>
											</p>
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()} className='divide-y divide-gray-200 bg-white'>
							{rows.map((row, i) => {
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

			<div>
				<div className='flex justify-between items-center'>
					<div>
						<BsFullscreen onClick={() => fScreenHandle.enter()} className='p-1.5 rounded-md bg-white text-black stroke-1 cursor-pointer text-2xl' />
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
							<p className='text-sm'>{data.length}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default React.memo(Table)
