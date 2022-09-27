import 'react-reflex/styles.css'
import type { NextPage } from 'next'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'
import Layout from '../components/Layout'
import QuerySelector from '../components/QuerySelector'
import Tables from '../components/Tables'
import Editor, { OnMount } from '@monaco-editor/react'
import WebsiteContext, { EditorState } from '../hooks/useWebsiteContext'
import { useRef, useState } from 'react'
import { editor } from 'monaco-editor'

const Home: NextPage = () => {
	const [tabs, setTabs] = useState<string[]>(['editor tab 1'])

	const [editorState, setEditorState] = useState<EditorState>({
		tabs,
		activeTabName: tabs[0] || null,
		editor: null
	})

	const handleEditorDidMount: OnMount = (editor, monaco) => {
		setEditorState((state) => ({ ...state, editor }))
	}

	return (
		<WebsiteContext.Provider
			value={{
				editorState,
				setEditorState
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
						<div className='flex overflow-scroll border-t text-sm'>
							{editorState.tabs.map((tab) => {
								return (
									<div className={`${editorState.activeTabName === tab ? 'border-b border-indigo-700' : ''} px-4 py-1 bg-white`} key={tab}>
										{tab}
									</div>
								)
							})}
						</div>

						<Editor path={editorState.activeTabName || 'default-model'} onMount={handleEditorDidMount} language='sql' />
					</ReflexElement>
				</ReflexContainer>
			</Layout>
		</WebsiteContext.Provider>
	)
}

export default Home
