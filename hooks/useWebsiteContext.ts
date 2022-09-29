import { useContext, createContext } from 'react'
import { TEditorState, TQueryState, TSidebarLinks } from '../global'

type TWebsiteContext = {
	editorState: TEditorState
	setEditorState: React.Dispatch<React.SetStateAction<TEditorState>>
	selectedSidebar: TSidebarLinks
	setSelectedSidebar: React.Dispatch<React.SetStateAction<TSidebarLinks>>
	selectedQueryIndex: number
	setSelectedQueryIndex: React.Dispatch<React.SetStateAction<number>>
	queryState: TQueryState
	setQueryState: React.Dispatch<React.SetStateAction<TQueryState>>
}

const WebsiteContext = createContext<TWebsiteContext | null>(null)

export const useWebsiteContext = (): TWebsiteContext => {
	const context = useContext(WebsiteContext)
	if (!context) {
		throw new Error('WebsiteContext should be used inside <WebsiteContext.Provider />')
	}
	return context
}

export default WebsiteContext
