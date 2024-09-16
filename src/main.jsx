import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import { App } from './components/app'
import './global.css'
import { TableViewProvider } from './providers/table-view-provider'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <TableViewProvider>
            <App />
        </TableViewProvider>
    </QueryClientProvider>
)
