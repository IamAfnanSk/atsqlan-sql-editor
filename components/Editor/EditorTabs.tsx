import { AiOutlineFileAdd } from 'react-icons/ai'
import { MdOutlineClose } from 'react-icons/md'
import { useWebsiteContext } from '../../hooks/useWebsiteContext'

const EditorTabs: React.FC = () => {
	const { editorState, setEditorState } = useWebsiteContext()

	return (
		<div className='flex'>
			{editorState.tabs.map((tab) => {
				return (
					<div
						onClick={() => {
							setEditorState((state) => {
								return {
									...state,
									activeTabName: tab
								}
							})
						}}
						className={`${editorState.activeTabName === tab ? 'border-gray-700' : 'border-white'} border-b-2 px-8 relative cursor-pointer group py-1 bg-white flex items-center`}
						key={tab}
					>
						<p className=''>{tab}</p>
						<MdOutlineClose
							onClick={(e) => {
								e.stopPropagation()
								setEditorState((state) => {
									if (state.tabs.length === 1) {
										return { ...state }
									}

									// Saving app from memory leaks
									if (state.monaco) {
										const models = state.monaco.editor.getModels()
										const modelToDispose = models.find((model) => model.uri.path.split('/').pop() === tab)

										modelToDispose?.dispose()
									}

									const newTabs = state.tabs.filter((t) => t != tab)
									return { ...state, tabs: newTabs, activeTabName: newTabs[0] }
								})
							}}
							className='p-0.5 right-1.5 transition-[visibility] duration-400 absolute group-hover:visible invisible hover:bg-gray-100 rounded-md text-lg cursor-pointer'
						/>
					</div>
				)
			})}

			{/* Limiting to 2 tabs as of now */}
			{editorState.tabs.length < 2 && (
				<div
					onClick={() => {
						setEditorState((state) => {
							const newTabName = `Tab ${Date.now()}`
							return { ...state, activeTabName: newTabName, tabs: [...state.tabs, newTabName] }
						})
					}}
					className={`cursor-pointer p-1 flex justify-center items-center ml-1 bg-white rounded-md`}
				>
					<AiOutlineFileAdd className='text-lg' />
				</div>
			)}
		</div>
	)
}

export default EditorTabs
