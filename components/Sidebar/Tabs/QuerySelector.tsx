import { useWebsiteContext } from '../../../hooks/useWebsiteContext'
import { SQLQueries } from '../../../global'
import { infoNotification } from '../../../utils/toast'
import { useEffect } from 'react'

const QuerySelector: React.FC = () => {
	const { selectedQueryIndex, setSelectedQueryIndex, editorState } = useWebsiteContext()

	// Update IDE value on query change
	useEffect(() => {
		editorState.editor?.setValue(SQLQueries[selectedQueryIndex].query)
	}, [editorState.editor, selectedQueryIndex])

	return (
		<div>
			<label htmlFor='query' className='block text-sm font-medium text-gray-700'>
				Select query
			</label>
			<select
				onChange={(e) => {
					const newSelectedIndex = parseInt(e.target.value)
					setSelectedQueryIndex(newSelectedIndex)
					infoNotification('Click on Run to execute new query :)')
				}}
				value={selectedQueryIndex}
				id='query'
				name='query'
				className='mt-1 cursor-pointer block w-full text-base shadow-sm outline-none focus:ring-0 border-none sm:text-sm rounded-md'
			>
				{SQLQueries.map((query, index) => {
					return (
						<option key={index} value={index}>
							{query.query}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default QuerySelector
