import { useLocation } from 'react-router-dom'

import { capitalize } from '../utils/utils'

export const usePageTitle = () => {
    const appName = 'SuperDash'

    const location = useLocation()
    const path = location.pathname.replace('/', '')

    const formattedPath = path.split('-').map(capitalize).join(' ')

    return formattedPath || appName
}
