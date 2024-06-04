import { Link, NavLink } from "react-router-dom"
import logo from '../../../assets/mealloungewhite.png'
import useAuth from "../../../hooks/useAuth"

const Sidebar = () => {
    const { logOut } = useAuth()
    return (
        <div>
            <Link to={'/'}><img src={logo} className="w-24 mx-auto mt-2" alt="" /></Link>
            <div>
                <ul className="menu">
                    <li><NavLink>Add Items</NavLink></li>
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