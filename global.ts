import { editor } from 'monaco-editor'
import monaco from 'monaco-editor'

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
