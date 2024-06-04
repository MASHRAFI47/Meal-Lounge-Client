import { Outlet } from "react-router-dom"
import Sidebar from "../components/Dashboard/Sidebar/Sidebar"

const DashboardLayout = () => {
    return (
        <div className="flex">
            <div className="w-64 relative min-h-screen bg-[#CA301B]">
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