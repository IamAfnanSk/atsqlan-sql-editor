import toast from 'react-hot-toast'

export const successNotification = (message: string): void => {
	toast.success(<span>{message}</span>)
}

export const warningNotification = (message: string): void => {
	toast(<span>{message}</span>, {
		icon: '⚠️'
	})
}

export const infoNotification = (message: string): void => {
	toast(<span>{message}</span>, {
		icon: 'ℹ️'
	})
}

export const errorNotification = (message: string): void => {
	toast.error(<span>{message}</span>)
}
