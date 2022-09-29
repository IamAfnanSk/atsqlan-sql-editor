import { FullScreenHandle } from 'react-full-screen'
import { BsFullscreen, BsStars } from 'react-icons/bs'
import { VscSave, VscPlay } from 'react-icons/vsc'
import { format } from 'sql-formatter'
import { useWebsiteContext } from '../../hooks/useWebsiteContext'
import { infoNotification, successNotification } from '../../utils/toast'

type TProps = {
	fScreenHandle: FullScreenHandle
}

const EditorOptions: React.FC<TProps> = ({ fScreenHandle }) => {
	const { setEditorState, setQueryState } = useWebsiteContext()

	return (
		<div className='mr-4 text-xs space-x-2 flex items-center'>
			<div onClick={() => fScreenHandle.enter()} className={`cursor-pointer py-1 px-2 flex justify-center items-center bg-white shadow-sm rounded-md`}>
				<p className='mr-1'>Fullscreen</p>
				<BsFullscreen />
			</div>
			<div
				onClick={() => {
					setEditorState((editorState) => {
						const currentValue = editorState.editor?.getValue()
						const formattedCode = format(currentValue || '')
						editorState.editor?.setValue(formattedCode)

						return { ...editorState }
					})
				}}
				className={`cursor-pointer py-1 px-2 flex justify-center items-center bg-white shadow-sm rounded-md`}
			>
				<p className='mr-1'>Format</p>
				<BsStars />
			</div>
			<div
				onClick={() => {
					infoNotification('Saving file...')
					setTimeout(() => {
						successNotification('File saved')
					}, 1000)
				}}
				className={`cursor-pointer py-1 px-2 flex justify-center items-center bg-white shadow-sm rounded-md`}
			>
				<p className='mr-1'>Save</p>
				<VscSave />
			</div>
			<div onClick={() => setQueryState('running')} className={`cursor-pointer py-1 px-2 flex justify-center items-center bg-indigo-700 text-white rounded-md`}>
				<p className='mr-1'>Run</p>
				<VscPlay />
			</div>
		</div>
	)
}

export default EditorOptions
