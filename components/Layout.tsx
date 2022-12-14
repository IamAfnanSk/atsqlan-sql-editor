import { Toaster, ToastBar } from 'react-hot-toast'
import Header from './Header'
import SidebarNavigation from './Sidebar/SidebarNavigation'

type TProps = {
	children?: React.ReactNode
	showSidebar?: boolean
}

const Layout: React.FC<TProps> = ({ children, showSidebar }) => {
	return (
		<>
			<section className='h-screen flex'>
				{showSidebar && <SidebarNavigation />}
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

			<Toaster
				position='bottom-right'
				reverseOrder={false}
				containerStyle={{ zIndex: 200000 }}
				toastOptions={{
					duration: 5000
				}}
			>
				{(t) => <ToastBar toast={t} style={t.style} />}
			</Toaster>
		</>
	)
}

export default Layout
