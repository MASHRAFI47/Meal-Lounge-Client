import { Link, NavLink } from "react-router-dom"

//icons
import { CgProfile } from "react-icons/cg";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa6";
import { GiHotMeal } from "react-icons/gi";
import { MdOutlineRateReview } from "react-icons/md";
import { RiTakeawayLine } from "react-icons/ri";
import { MdOutlineUpcoming } from "react-icons/md";


const AdminMenu = () => {
    return (
        <div>
            <ul className="menu space-y-3">
                <li><Link className="font-bold" to={'/dashboard'}><CgProfile size={20} /> My Profile</Link></li>
                <li><NavLink className={'font-bold'} to={'/dashboard/manage-users'}><MdOutlineManageAccounts size={20} />Manage Users</NavLink></li>
                <li><NavLink className={'font-bold'} to={'/dashboard/add-meal'}><FaCartPlus size={20} />Add Meal</NavLink></li>
                <li><NavLink className={'font-bold'} to={'/dashboard/all-meals'}><GiHotMeal size={20} />All Meals</NavLink></li>
                <li><NavLink className={'font-bold'} to={'/dashboard/all-reviews'}><MdOutlineRateReview size={20} />All Reviews</NavLink></li>
                <li><NavLink className={'font-bold'} to={'/dashboard/serve-meals'}><RiTakeawayLine size={20} />Serve Meals</NavLink></li>
                <li><NavLink className={'font-bold'} to={'/dashboard/upcoming-meals-admin'}><MdOutlineUpcoming size={20} />Upcoming Meals</NavLink></li>
            </ul>

            <label className="cursor-pointer grid place-items-center">
                <input type="checkbox" value="synthwave" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </label>
        </div>
    )
}

export default AdminMenu