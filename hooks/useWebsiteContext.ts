import { useContext, createContext } from 'react'

type WebsiteContextType = {}

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
