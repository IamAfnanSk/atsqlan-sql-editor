import { editor } from 'monaco-editor'
import monaco from 'monaco-editor'

const initialTab = 'Editor tab'

export type EditorState = {
	activeTabName: string | null
	tabs: string[]
	editor: editor.IStandaloneCodeEditor | null
	monaco: typeof monaco | null
}

export const initialEditorState: EditorState = {
	tabs: [initialTab],
	activeTabName: initialTab || null,
	editor: null,
	monaco: null
}
