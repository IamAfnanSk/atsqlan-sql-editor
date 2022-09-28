import 'react-reflex/styles.css'
import type { NextPage } from 'next'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'
import Layout from '../components/Layout'
import QuerySelector from '../components/QuerySelector'
import Tables from '../components/Tables'
import WebsiteContext from '../hooks/useWebsiteContext'
import { useState } from 'react'
import EditorArea from '../components/EditorArea'
import { TEditorState, initialEditorState, TSidebarLinks } from './global'

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
			<Layout>
				<ReflexContainer orientation='vertical' className='h-full'>
					<ReflexElement minSize={200} size={300} maxSize={350}>
						<div className='px-4 py-3 space-y-3'>
							<QuerySelector />
							<Tables />
						</div>
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
