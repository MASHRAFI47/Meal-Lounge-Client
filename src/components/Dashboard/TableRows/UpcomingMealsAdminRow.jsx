import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';


const UpcomingMealsAdminRow = ({ meal, refetch }) => {

    const axiosSecure = useAxiosSecure()

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.put(`/meal/${id}`, { likes: 10 })
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            refetch()
        }
    })


    const handlePublishMeal = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add it!"
        }).then((result) => {
            if (result.isConfirmed) {

                mutateAsync(id)

                Swal.fire({
                    title: "Added!",
                    text: "Your meal has been added.",
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
                    </div>
                </div>
            </td>
            <td>
                {meal?.likes}
            </td>
            <td className='lg:w-96'>
                {/* Reviews Count */}
                {meal?.reviews}
            </td>
            <th>
                <button className="btn btn-ghost btn-sm text-purple-600 font-bold" onClick={() => handlePublishMeal(meal?._id)}>Publish Meal</button>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
            </th>
        </tr>
    )
}

UpcomingMealsAdminRow.propTypes = {
    meal: PropTypes.object,
    refetch: PropTypes.func
}

export default UpcomingMealsAdminRow