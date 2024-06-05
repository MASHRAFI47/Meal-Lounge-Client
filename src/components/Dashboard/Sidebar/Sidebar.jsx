import { Link, NavLink } from "react-router-dom"
import logo from '../../../assets/mealloungewhite.png'
import useAuth from "../../../hooks/useAuth"
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const Sidebar = () => {
    const { logOut } = useAuth();
    const [role, isLoading] = useRole();

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <Link to={'/'}><img src={logo} className="w-24 mx-auto mt-2" alt="" /></Link>
            <div>
                <ul className="menu">
                    {/* <li><NavLink to={'/dashboard/manage-users'}>Manage Users</NavLink></li> */}
                    {role === 'admin' && <li><NavLink to={'/dashboard/manage-users'}>Manage Users</NavLink></li>}
                </ul>
            </div>

            <div className="absolute bottom-10 left-5">
                <ul>
                    <li className="btn" onClick={logOut}>Logout</li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar