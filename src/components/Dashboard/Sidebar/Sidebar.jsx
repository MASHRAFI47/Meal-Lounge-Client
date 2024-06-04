import { NavLink } from "react-router-dom"
import logo from '../../../assets/mealloungewhite.png'

const Sidebar = () => {
    return (
        <div>
            <img src={logo} className="w-24 mx-auto mt-2" alt="" />
            <ul className="menu">
                <li><NavLink>Add Items</NavLink></li>
            </ul>
        </div>
    )
}

export default Sidebar