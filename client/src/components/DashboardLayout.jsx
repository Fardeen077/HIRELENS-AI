import React from 'react'
// import Sidebar from './Sidebar'
import { Outlet } from "react-router-dom";
function DashboardLayout() {
    return (
        <div className="md:min-h-screen flex bg-black h-screen">
            
            {/* sidebar - handles both desktop and mobile */}
            {/* <Sidebar /> */}
            sidebar
            {/* main content */}
            <div className="flex-1 min-w-0 md:overflow-y-auto">
                <div className="p-4">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}
export default DashboardLayout