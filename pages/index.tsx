import 'react-reflex/styles.css'
import type { NextPage } from 'next'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'
import Layout from '../components/Layout'
import WebsiteContext from '../hooks/useWebsiteContext'
import { useState } from 'react'
import EditorArea from '../components/Editor/EditorArea'
import { TEditorState, initialEditorState, TSidebarLinks } from './global'
import Sidebar from '../components/Sidebar/Sidebar'

const Home: NextPage = () => {
	const [editorState, setEditorState] = useState<TEditorState>(initialEditorState)
	const [selectedSidebar, setSelectedSidebar] = useState<TSidebarLinks>('query')

	return (
		<WebsiteContext.Provider
			value={{
				editorState,
				setEditorState,
				selectedSidebar,
				setSelectedSidebar
			}}
		>
			<Layout showSidebar={true}>
				<ReflexContainer orientation='vertical' className='h-full'>
					<ReflexElement minSize={200} size={300} maxSize={350}>
						<Sidebar />
					</ReflexElement>

					<ReflexSplitter />

					<ReflexElement>
						<EditorArea />
					</ReflexElement>
				</ReflexContainer>
			</Layout>
		</WebsiteContext.Provider>
	)
}

export default Home
