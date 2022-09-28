import Editor, { OnMount } from '@monaco-editor/react'
import { VscSave, VscPlay } from 'react-icons/vsc'
import { useWebsiteContext } from '../../hooks/useWebsiteContext'
import EditorTabs from './EditorTabs'

const EditorArea: React.FC = () => {
	const { editorState, setEditorState, setQueryState } = useWebsiteContext()

	const handleEditorDidMount: OnMount = (editor, monaco) => {
		setEditorState((state) => ({ ...state, editor, monaco }))
	}

	return (
		<>
			<div className='flex border-t text-sm justify-between items-center'>
				<EditorTabs />

				<div className='mr-4 text-xs space-x-2 flex items-center'>
					<div onClick={() => {}} className={`cursor-pointer py-1 px-2 flex justify-center items-center bg-white shadow-sm rounded-md`}>
						<p className='mr-1'>Save</p>
						<VscSave />
					</div>
					<div onClick={() => setQueryState('running')} className={`cursor-pointer py-1 px-2 flex justify-center items-center bg-indigo-700 text-white rounded-md`}>
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
