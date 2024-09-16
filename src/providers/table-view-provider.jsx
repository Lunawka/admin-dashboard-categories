import { createContext, useContext, useState } from 'react'

export const TableViewContext = createContext({
    tableView: true,
    onTableViewSwitch: () => {}
})

export const TableViewProvider = ({ children }) => {
    const [tableView, setTableView] = useState(true)

    const value = {
        tableView,
        onTableViewSwitch: () => setTableView(!tableView)
    }

    return <TableViewContext.Provider value={value}>{children}</TableViewContext.Provider>
}

export const useTableView = () => {
    const context = useContext(TableViewContext)

    if (context === undefined)
        throw new Error('useContext must be used within a TableViewProvider')

    return context
}
