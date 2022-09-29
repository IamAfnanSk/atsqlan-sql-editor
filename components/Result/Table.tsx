/* eslint-disable react/jsx-key */
import { Column, useSortBy, useTable } from 'react-table'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import React, { useEffect, useMemo, useState } from 'react'
import TableFooterWithOptions from './TableFooterWithOptions'
import { LIMIT_FOR_ROWS } from '../../global'

type TProps = {
	columns: Column[]
	data: any[]
	timeToResult: number
}

const Table: React.FC<TProps> = ({ columns: columnsData, data: rowsData, timeToResult: timeTaken }) => {
	const [dataToProcess, setDataToProcess] = useState(rowsData)
	const [limitResults, setLimitResults] = useState(false)

	const timeToResult = useMemo(() => timeTaken, [timeTaken])

	const columns = useMemo(() => columnsData, [columnsData])
	const data = useMemo(() => dataToProcess, [dataToProcess])

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
											{...column.getHeaderProps((column as any).getSortByToggleProps())}
											scope='col'
											className='sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-4 py-1.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell'
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

			<TableFooterWithOptions
				columnsLength={columns.length}
				filteredRowsLength={rows.length}
				allRowsLength={rowsData.length}
				fScreenHandle={fScreenHandle}
				timeToResult={timeToResult}
				limitResults={limitResults}
				setLimitResults={setLimitResults}
			/>
		</div>
	)
}

export default React.memo(Table)
