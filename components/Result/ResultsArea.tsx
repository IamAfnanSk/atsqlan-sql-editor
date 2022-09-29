import Papa from 'papaparse'
import { useEffect, useState } from 'react'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { BiError } from 'react-icons/bi'
import { Column } from 'react-table'
import { SQLQueries } from '../../global'
import { useWebsiteContext } from '../../hooks/useWebsiteContext'
import { errorNotification } from '../../utils/toast'
import Table from './Table'

const ResultsArea: React.FC = () => {
	const { queryState, selectedQueryIndex, setQueryState } = useWebsiteContext()
	const [columns, setColumns] = useState<Column[]>([])
	const [data, setData] = useState<any[]>([])
	const [timeToResult, setTimeToResult] = useState<number>(0)

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

			{queryState === 'success' && <Table timeToResult={timeToResult} columns={columns} data={data} />}

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
