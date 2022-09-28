import { useWebsiteContext } from '../../hooks/useWebsiteContext'
import About from '../About'
import QuerySelector from '../QuerySelector'
import Tables from '../Tables'

const Sidebar: React.FC = () => {
	const { selectedSidebar } = useWebsiteContext()

	return (
		<div className='px-4 py-3 space-y-3'>
			{selectedSidebar === 'queries' && <QuerySelector />}
			{selectedSidebar === 'tables' && <Tables />}
			{selectedSidebar === 'about' && <About />}
		</div>
	)
}

export default Sidebar
