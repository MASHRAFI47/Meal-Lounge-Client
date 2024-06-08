import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//icons
import { FaRegTrashCan } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";

import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const AllMealsDataRow = ({ meal, refetch }) => {
    const axiosSecure = useAxiosSecure()

    const { mutateAsync } = useMutation({
        mutationFn: async (mealId) => {
            const { data } = await axiosSecure.delete(`/meal/${mealId}`)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            refetch()
        }
    })

    const handleDelete = (mealId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(mealId)

                mutateAsync(mealId)

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

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
            <th className='space-x-2'>
                <button className="btn btn-sm bg-green-600 hover:bg-green-500 text-white"><BsPencilSquare /></button>
                <button className="btn btn-sm bg-red-600 hover:bg-red-500 text-white" onClick={() => handleDelete(meal?._id)}><FaRegTrashCan /></button>
                <Link to={`/meal-details/${meal?._id}`} className='btn btn-sm text-white relative bottom-[2px] btn-primary'>View</Link>
            </th>
        </tr>
    )
}

AllMealsDataRow.propTypes = {
    meal: PropTypes.object,
    refetch: PropTypes.func,
}



export default AllMealsDataRow