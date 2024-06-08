import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const AllMealsDataRow = ({ meal }) => {
    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={meal?.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{meal?.title}</div>
                        <div className="text-sm opacity-50">{meal?.likes} likes</div>
                    </div>
                </div>
            </td>
            <td>{meal?.adminName}</td>
            <td className='w-96'>
                {meal?.reviews}
                {/* <br />
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
            </td>
            <th>
                <button className="btn btn-xs">Update</button>
                <button className="btn btn-xs">Delete</button>
                <Link to={`/meal-details/${meal?._id}`}>View</Link>
            </th>
        </tr>
    )
}

AllMealsDataRow.propTypes = {
    meal: PropTypes.object,
}



export default AllMealsDataRow