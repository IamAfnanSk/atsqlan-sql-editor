import Editor, { OnMount } from '@monaco-editor/react'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { MdOutlineClose } from 'react-icons/md'
import { VscSave, VscPlay } from 'react-icons/vsc'
import { useWebsiteContext } from '../hooks/useWebsiteContext'

const EditorArea: React.FC = () => {
	const { editorState, setEditorState } = useWebsiteContext()

	const handleEditorDidMount: OnMount = (editor, monaco) => {
		setEditorState((state) => ({ ...state, editor, monaco }))
	}

	return (
		<>
			<div className='flex border-t text-sm justify-between items-center'>
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
								className={`${
									editorState.activeTabName === tab ? 'border-gray-700' : 'border-white'
								} border-b-2 flex-shrink-0 px-8 relative cursor-pointer group py-1 bg-white flex items-center`}
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
									const newTabName = `Editor tab ${Math.round(Math.random() * 10000)}`
									return { ...state, activeTabName: newTabName, tabs: [...state.tabs, newTabName] }
								})
							}}
							className={`flex-shrink-0 cursor-pointer p-1 flex justify-center items-center ml-1 bg-white rounded-md`}
						>
							<AiOutlineFileAdd className='text-lg' />
						</div>
					)}
				</div>

				<div className='mr-4 text-xs space-x-2 flex items-center'>
					<div onClick={() => {}} className={`flex-shrink-0 cursor-pointer py-1 px-2 flex justify-center items-center bg-white shadow-sm rounded-md`}>
						<p className='mr-1'>Save</p>
						<VscSave />
					</div>
					<div onClick={() => {}} className={`flex-shrink-0 cursor-pointer py-1 px-2 flex justify-center items-center bg-indigo-700 text-white rounded-md`}>
						<p className='mr-1'>Run</p>
						<VscPlay />
					</div>
				</div>
			</div>

			<Editor path={editorState.activeTabName || 'default-model'} onMount={handleEditorDidMount} language='sql' />
		</>
	)
}

export default EditorArea
