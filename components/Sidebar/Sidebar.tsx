import { useWebsiteContext } from '../../hooks/useWebsiteContext'
import About from './Tabs/About'
import QuerySelector from './Tabs/QuerySelector'
import DatabaseTables from './Tabs/DatabaseTables'

const Sidebar: React.FC = () => {
	const { selectedSidebar } = useWebsiteContext()

	return (
		<div className='px-4 py-3 space-y-3'>
			{selectedSidebar === 'queries' && <QuerySelector />}

			{selectedSidebar === 'tables' && <DatabaseTables />}

			{selectedSidebar === 'about' && <About />}
		</div>
	)
}

export default Sidebar
