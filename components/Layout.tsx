import Header from './Header'
import Sidebar from './SidebarNavigation'

type TProps = {
	children?: React.ReactNode
}

const Layout: React.FC<TProps> = ({ children }) => {
	return (
		<section className='h-screen flex'>
			<Sidebar />
			<section className='flex-1'>
				<Header />
				<main
					className={`bg-gray-100`}
					style={{
						height: 'calc(100% - 48px)'
					}}
				>
					{children}
				</main>
			</section>
		</section>
	)
}

export default Layout
