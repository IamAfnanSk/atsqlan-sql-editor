import '../styles/globals.css'
import 'allotment/dist/style.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}

export default MyApp
