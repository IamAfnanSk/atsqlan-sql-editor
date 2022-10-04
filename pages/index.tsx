import type { NextPage } from 'next'
import Layout from '../components/Layout'
import WebsiteContext from '../hooks/useWebsiteContext'
import { useState, Suspense } from 'react'
import { TEditorState, initialEditorState, TSidebarLinks, TQueryState } from '../global'
import Sidebar from '../components/Sidebar/Sidebar'
import Head from 'next/head'
import { Allotment } from 'allotment'
import dynamic from 'next/dynamic'

const ResultsArea = dynamic(() => import('../components/Result/ResultsArea'), {
	suspense: true
})

const EditorArea = dynamic(() => import('../components/Editor/EditorArea'), {
	suspense: true
})

const Home: NextPage = () => {
	const [editorState, setEditorState] = useState<TEditorState>(initialEditorState)
	const [selectedQueryIndex, setSelectedQueryIndex] = useState<number>(0)
	const [selectedSidebar, setSelectedSidebar] = useState<TSidebarLinks>('queries')
	const [queryState, setQueryState] = useState<TQueryState>('idle')

	return (
		<WebsiteContext.Provider
			value={{
				editorState,
				setEditorState,
				selectedSidebar,
				setSelectedSidebar,
				selectedQueryIndex,
				setSelectedQueryIndex,
				queryState,
				setQueryState
			}}
		>
			<Layout showSidebar={true}>
				<Allotment>
					<Allotment.Pane minSize={250} maxSize={300}>
						<Sidebar />
					</Allotment.Pane>

					<Allotment.Pane>
						<Allotment vertical>
							<Allotment.Pane>
								<Suspense fallback={`Loading editor...`}>
									<EditorArea />
								</Suspense>
								<EditorArea />
							</Allotment.Pane>
							<Allotment.Pane minSize={350} maxSize={450}>
								<Suspense fallback={`Loading results...`}>
									<ResultsArea />
								</Suspense>
							</Allotment.Pane>
						</Allotment>
					</Allotment.Pane>
				</Allotment>
			</Layout>

			<Head>
				<title>SQL Editor by Afnan</title>
				<meta name='description' content='A Frontend focused SQL editor to execute SQL queries' />
			</Head>
		</WebsiteContext.Provider>
	)
}

export default Home
