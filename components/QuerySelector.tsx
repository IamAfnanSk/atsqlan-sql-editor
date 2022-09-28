import { useWebsiteContext } from '../hooks/useWebsiteContext'
import { SQLQueries } from '../global'

const QuerySelector: React.FC = () => {
	const { selectedQueryIndex, setSelectedQueryIndex } = useWebsiteContext()

	return (
		<div>
			<label htmlFor='query' className='block text-sm font-medium text-gray-700'>
				Select query
			</label>
			<select
				onChange={(e) => {
					const newSelectedIndex = parseInt(e.target.value)
					setSelectedQueryIndex(newSelectedIndex)
				}}
				value={selectedQueryIndex}
				id='query'
				name='query'
				className='mt-1 cursor-pointer block w-full text-base shadow-sm outline-none focus:ring-0 border-none sm:text-sm rounded-md'
			>
				{SQLQueries.map((query, index) => {
					return (
						<option key={index} value={index}>
							{query}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default QuerySelector
