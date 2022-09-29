import { editor } from 'monaco-editor'
import monaco from 'monaco-editor'
import { successNotification, errorNotification } from './utils/toast'

const initialTab = 'Editor tab'

export type TEditorState = {
	activeTabName: string | null
	tabs: string[]
	editor: editor.IStandaloneCodeEditor | null
	monaco: typeof monaco | null
}

export const initialEditorState: TEditorState = {
	tabs: [initialTab],
	activeTabName: initialTab || null,
	editor: null,
	monaco: null
}

export type TSidebarLinks = 'queries' | 'tables' | 'about'

export type TQueryState = 'idle' | 'running' | 'error' | 'success'

type TSQLQuery = {
	query: string
	dataURL: string
}

export const SQLQueries: TSQLQuery[] = [
	{
		query: `SELECT * FROM customers;`,
		dataURL: 'https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/customers.csv'
	},
	{
		query: `SELECT * FROM employees;`,
		dataURL: 'https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/employees.csv'
	},
	{
		query: `SELECT * FROM orders;`,
		dataURL: 'https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/orders.csv'
	}
]

export const LIMIT_FOR_ROWS = 50

export function copyToClipboard(str: string, customMessage?: string): void {
	try {
		navigator.clipboard.writeText(str)
		successNotification(customMessage ? customMessage : 'Copied to clipboard')
	} catch (error) {
		errorNotification('Error copying to your clipboard. Please copy manually')
	}
}
