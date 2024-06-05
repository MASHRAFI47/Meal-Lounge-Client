import { Link } from "react-router-dom"
import logo from '../../../assets/mealloungewhite.png'
import useAuth from "../../../hooks/useAuth"
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import AdminMenu from "../Menu/AdminMenu";

import { GiHamburgerMenu } from "react-icons/gi";



//
// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'
import { useState } from "react";

const Sidebar = () => {
    const { logOut } = useAuth();
    const [role, isLoading] = useRole();

    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <div className="hidden md:block">
                <Link to={'/'}><img src={logo} className="w-24 mx-auto mt-2" alt="" /></Link>
                <div className="mt-5">
                    {role === 'admin' && <AdminMenu />}
                </div>

                <div className="absolute bottom-10 left-5">
                    <ul>
                        <li className="btn" onClick={logOut}>Logout</li>
                    </ul>
                </div>
            </div>


            <button onClick={toggleDrawer} className="absolute left-[22rem] top-8"><GiHamburgerMenu /></button>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className='bla bla bla'
            >
                <div>
                    {role === 'admin' && <AdminMenu />}
                </div>
            </Drawer>
        </div>
    )
}

export default Sidebar