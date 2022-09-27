import { useContext, createContext } from 'react'
import { editor } from 'monaco-editor'

export type EditorState = {
	activeTabName: string | null
	tabs: string[]
	editor: editor.IStandaloneCodeEditor | null
}

type WebsiteContextType = {
	editorState: EditorState
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

const WebsiteContext = createContext<WebsiteContextType | null>(null)

export const useWebsiteContext = (): WebsiteContextType => {
	const context = useContext(WebsiteContext)
	if (!context) {
		throw new Error(
			'WebsiteContextType should be used inside <WebsiteContext.Provider />'
		)
	}
	return context
}

export default WebsiteContext
