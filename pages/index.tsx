import 'react-reflex/styles.css'
import type { NextPage } from 'next'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'
import Layout from '../components/Layout'
import QuerySelector from '../components/QuerySelector'
import Tables from '../components/Tables'

const Home: NextPage = () => {
	return (
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
					<h1>Hello 2</h1>
				</ReflexElement>
			</ReflexContainer>
		</Layout>
	)
}

export default Home
