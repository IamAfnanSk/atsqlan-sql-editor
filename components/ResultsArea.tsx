import Papa from 'papaparse'
import { useEffect, useMemo, useState } from 'react'
import { SQLQueries } from '../global'
import { useWebsiteContext } from '../hooks/useWebsiteContext'

const ResultsArea: React.FC = () => {
	const { queryState, selectedQueryIndex, setQueryState } = useWebsiteContext()
	const [columnsData, setColumnsData] = useState([])
	const [rowsData, setRowsData] = useState([])

	const columns = useMemo(() => columnsData, [columnsData])
	const data = useMemo(() => rowsData, [rowsData])

	useEffect(() => {
		if (queryState === 'running') {
			const fetchData = async () => {
				try {
					const rawData = await (await fetch(SQLQueries[selectedQueryIndex].dataURL)).text()
					const data = Papa.parse<any>(rawData).data

					const columns = data[0].map((col: string) => {
						return {
							Header: col,
							accessor: col.split(' ').join('_').toLowerCase()
						}
					})

					const rows: any = data.slice(1).map((row: string[]) => {
						return row.reduce((acc: any, curr, index: number) => {
							acc[columns[index].accessor] = curr
							return acc
						}, {})
					})

					setColumnsData(columns)
					setRowsData(rows)
				} catch (error) {
					console.log(error)
					setQueryState('error')
				}
			}
			fetchData()
			setQueryState('success')
		}
	}, [queryState, selectedQueryIndex, setQueryState])

	return (
		<div>
			{queryState === 'idle' && <h1>Run query</h1>}
			{queryState === 'running' && <h1>Loading</h1>}
			{queryState === 'success' && <h1>Data</h1>}
			{queryState === 'error' && <h1>Error occoured</h1>}
		</div>
	)
}

export default ResultsArea
