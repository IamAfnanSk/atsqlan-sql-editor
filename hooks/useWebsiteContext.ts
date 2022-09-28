import { useContext, createContext } from 'react'
import { EditorState } from '../pages/global'

type WebsiteContextType = {
	editorState: EditorState
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

const WebsiteContext = createContext<WebsiteContextType | null>(null)

export const useWebsiteContext = (): WebsiteContextType => {
	const context = useContext(WebsiteContext)
	if (!context) {
		throw new Error('WebsiteContext should be used inside <WebsiteContext.Provider />')
	}
	return context
}

export default WebsiteContext
