import Helmet from 'react-helmet'

import { usePageTitle } from '../hooks/use-page-name'

export const MetaHead = ({ description = 'some description' }) => {
    const pageTitle = usePageTitle()

    return (
        <Helmet>
            <meta charSet='utf-8' />
            <title>{pageTitle}</title>
            <meta
                name='description'
                content={description}
            />
            <meta
                name='viewport'
                content='width=device-width, initial-scale=1.0'
            />
        </Helmet>
    )
}
