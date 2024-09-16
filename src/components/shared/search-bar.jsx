import { Input } from 'antd'

export const SearchBar = ({ search, setSearch }) => {
    return (
        <Input
            onChange={(e) => setSearch(e.target.value)}
            defaultValue={search}
            placeholder='Search...'
        />
    )
}
