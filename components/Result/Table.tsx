import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import React, { useRef, useState } from 'react'
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, Row, SortingState, useReactTable } from '@tanstack/react-table'
import { useVirtual } from 'react-virtual'

type TProps = {
	columns: ColumnDef<any>[]
	data: any[]
}

const Table: React.FC<TProps> = ({ columns, data }) => {
	const [sorting, setSorting] = useState<SortingState>([])

	const tableContainerRef = useRef<HTMLDivElement>(null)

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	})

	const { rows } = table.getRowModel()

	const rowVirtualizer = useVirtual({
		parentRef: tableContainerRef,
		size: rows.length,
		overscan: 40
	})
	const { virtualItems: virtualRows, totalSize } = rowVirtualizer

	const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
	const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0

	return (
		<div className='overflow-scroll relative rounded-lg' ref={tableContainerRef}>
			<table className='divide-y divide-gray-300 text-left'>
				<thead className='bg-white'>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id} className='divide-x divide-gray-200'>
							{headerGroup.headers.map((header) => {
								return (
									<th
										className='sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-4 py-1.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter table-cell'
										key={header.id}
										colSpan={header.colSpan}
									>
										{header.isPlaceholder ? null : (
											<p className='flex items-center space-x-2' onClick={header.column.getToggleSortingHandler()}>
												<span> {flexRender(header.column.columnDef.header, header.getContext())}</span>
												<span>
													{{
														asc: <FaSortUp />,
														desc: <FaSortDown />
													}[header.column.getIsSorted() as string] ?? <FaSort />}
												</span>
											</p>
										)}
									</th>
								)
							})}
						</tr>
					))}
				</thead>
				<tbody className='divide-y divide-gray-200 bg-white'>
					{paddingTop > 0 && (
						<tr>
							<td style={{ height: `${paddingTop}px` }} />
						</tr>
					)}
					{virtualRows.map((virtualRow) => {
						const row = rows[virtualRow.index] as Row<any>
						return (
							<tr key={row.id} className='divide-x divide-gray-200'>
								{row.getVisibleCells().map((cell) => {
									return (
										<td className='whitespace-nowrap px-4 py-1.5 text-sm text-gray-500' key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									)
								})}
							</tr>
						)
					})}
					{paddingBottom > 0 && (
						<tr>
							<td style={{ height: `${paddingBottom}px` }} />
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default React.memo(Table)
