import React from 'react'
import NavigationBar from './Shared/components/NavigationBar'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './Shared/components/ScrollToTop'

const AppLayout = () => {
    return (
        <div>
            <ScrollToTop />
            <NavigationBar />
            <Outlet />
        </div>
    )
}

export default AppLayout
