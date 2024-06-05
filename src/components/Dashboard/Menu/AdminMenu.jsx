import { NavLink } from "react-router-dom"

const AdminMenu = () => {
    return (
        <div>
            <ul>
                <li><NavLink to={'/dashboard/manage-users'}>Manage Users</NavLink></li>
            </ul>
        </div>
    )
}

export default AdminMenu