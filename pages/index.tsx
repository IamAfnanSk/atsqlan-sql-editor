import 'react-reflex/styles.css'
import type { NextPage } from 'next'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'
import Layout from '../components/Layout'

const Home: NextPage = () => {
	return (
		<Layout>
			<ReflexContainer orientation='vertical' className='h-full'>
				<ReflexElement minSize={200} size={300} maxSize={350}>
					<h1>Hello 1</h1>
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
