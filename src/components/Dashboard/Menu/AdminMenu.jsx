import { NavLink } from "react-router-dom"

const AdminMenu = () => {
    return (
        <div>
            <ul className="menu space-y-3">
                <li><NavLink className={'font-bold'} to={'/dashboard/manage-users'}>Manage Users</NavLink></li>
                <li><NavLink className={'font-bold'} to={'/dashboard/add-meal'}>Add Meal</NavLink></li>
                <li><NavLink className={'font-bold'} to={'/dashboard/all-meals'}>All Meals</NavLink></li>
                <li><NavLink className={'font-bold'} to={'/dashboard/all-reviews'}>All Reviews</NavLink></li>
            </ul>
        </div>
    )
}

export default AdminMenu