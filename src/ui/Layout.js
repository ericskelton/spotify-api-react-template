import react from 'react'
import Toolbar from './ToolBar'
import PageRoutes from '../routes/PageRoutes'
import ErrorBoundary from '../utils/General/ErrorBoundary'

export default function Layout() {
    return (
        <>
            <Toolbar/>
            <ErrorBoundary>
                <PageRoutes/>
            </ErrorBoundary>
        </>
    )
}
