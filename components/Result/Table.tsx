/* eslint-disable react/jsx-key */
import { Column, useSortBy, useTable } from 'react-table'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import React from 'react'

type TProps = {
	columns: Column[]
	data: any[]
}

const Table: React.FC<TProps> = ({ columns, data }) => {
	const { headerGroups, rows, prepareRow, getTableProps, getTableBodyProps } = useTable(
		{
			columns,
			data
		},
		useSortBy
	)

	return (
		<div className='overflow-scroll relative rounded-lg'>
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
		</div>
	)
}

export default React.memo(Table)
