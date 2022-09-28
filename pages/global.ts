import { editor } from 'monaco-editor'
import monaco from 'monaco-editor'

const initialTab = 'Editor tab'

export type TEditorState = {
	activeTabName: string | null
	tabs: string[]
	editor: editor.IStandaloneCodeEditor | null
	monaco: typeof monaco | null
}

export const initialEditorState: TEditorState = {
	tabs: [initialTab],
	activeTabName: initialTab || null,
	editor: null,
	monaco: null
}

export type TSidebarLinks = 'queries' | 'tables' | 'about'

export const SQLQueries = ['SELECT * FROM test_table;', 'SELECT name FROM test_table;', `SELECT * FROM test_table WHERE name = 'Afnan';`]
