import Editor, { OnMount } from '@monaco-editor/react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { useWebsiteContext } from '../../hooks/useWebsiteContext'
import EditorTabs from './EditorTabs'
import EditorOptions from './EditorOptions'

const EditorArea: React.FC = () => {
	const { editorState, setEditorState } = useWebsiteContext()

	const handleEditorDidMount: OnMount = (editor, monaco) => {
		setEditorState((state) => ({ ...state, editor, monaco }))
	}

	const fScreenHandle = useFullScreenHandle()

	return (
		<>
			<div className='flex border-t text-sm justify-between items-center'>
				<EditorTabs />
				<EditorOptions fScreenHandle={fScreenHandle} />
			</div>

			<FullScreen className='h-full' handle={fScreenHandle}>
				<Editor path={editorState.activeTabName || 'default-model'} onMount={handleEditorDidMount} language='sql' />
			</FullScreen>
		</>
	)
}

export default EditorArea
