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
import { MdOutlineClose } from 'react-icons/md'
import { AiOutlineFileAdd } from 'react-icons/ai'

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
						<div className='flex border-t text-sm w-full overflow-scroll'>
							{editorState.tabs.map((tab) => {
								return (
									<div
										onClick={() => {
											setEditorState((state) => {
												return {
													...state,
													activeTabName: tab
												}
											})
										}}
										className={`${
											editorState.activeTabName === tab ? 'border-gray-700' : 'border-white'
										} border-b-2 flex-shrink-0 px-8 relative cursor-pointer group py-1 bg-white flex items-center`}
										key={tab}
									>
										<p className=''>{tab}</p>
										<MdOutlineClose className='p-0.5 right-1.5 transition-[visibility] duration-400 absolute group-hover:visible invisible hover:bg-gray-100 rounded-md text-lg cursor-pointer' />
									</div>
								)
							})}

							{/* Limiting to 2 tabs as of now */}
							{tabs.length < 2 && (
								<div className={`flex-shrink-0 cursor-pointer p-1 flex justify-center items-center ml-1 bg-white rounded-md`}>
									<AiOutlineFileAdd className='text-lg' />
								</div>
							)}
						</div>

						<Editor path={editorState.activeTabName || 'default-model'} onMount={handleEditorDidMount} language='sql' />
					</ReflexElement>
				</ReflexContainer>
			</Layout>
		</WebsiteContext.Provider>
	)
}

export default Home
