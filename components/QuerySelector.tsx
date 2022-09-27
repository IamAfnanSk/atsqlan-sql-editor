const QuerySelector: React.FC = () => {
	return (
		<div>
			<label
				htmlFor='query'
				className='block text-sm font-medium text-gray-700'
			>
				Select query
			</label>
			<select
				defaultValue={1}
				id='query'
				name='query'
				className='mt-1 cursor-pointer block w-full pl-3 pr-10 py-2 text-base shadow-sm outline-none focus:ring-0 border-none sm:text-sm rounded-md'
			>
				<option value={0}>SELECT *</option>
				<option value={1}>SELECT * WHERE</option>
				<option value={2}>SELECT * FROM</option>
			</select>
		</div>
	)
}

export default QuerySelector
