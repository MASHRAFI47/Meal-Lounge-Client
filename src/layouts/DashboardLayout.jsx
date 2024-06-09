import { Outlet } from "react-router-dom"
import Sidebar from "../components/Dashboard/Sidebar/Sidebar"

const DashboardLayout = () => {
    return (
        <div className="md:flex">
            <div className="w-64 relative md:min-h-screen md:bg-blue-400">
                <Sidebar />
            </div>
            <div className="flex-1 md:ml-5">
                <div className="p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout