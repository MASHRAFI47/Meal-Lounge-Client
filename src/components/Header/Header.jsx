import { Link, NavLink } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

import logo from '../../assets/mealloungewhite.png'

const Header = () => {
    const { user, logOut } = useAuth();
    const links = <>
        <li><NavLink to={'/'} className={'font-bold text-white'}>Home</NavLink></li>
        <li><NavLink to={'/meals'} className={'font-bold text-white'}>Meals</NavLink></li>
        <li><NavLink to={'/register'} className={'font-bold text-white'}>Register</NavLink></li>
    </>
    return (
        <div className="">
            <div className="navbar fixed z-10 bg-[#CA301B] bg-opacity-90">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <Link to={'/'}><img src={logo} className="w-24 cursor-pointer" alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <p className="text-center font-bold">{user?.displayName}</p>
                                    <li><a>Dashboard</a></li>
                                    <li onClick={logOut}><a>Logout</a></li>
                                </ul>
                            </div>
                            :
                            <Link to={'/login'} className="btn bg-[#CA301B] hover:bg-[#ff3535] text-white">Join Us</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header