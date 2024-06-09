import { useMutation } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const ServeMealsDataRow = ({ meal, index, refetch }) => {
    const axiosSecure = useAxiosSecure()

    const { mutateAsync } = useMutation({
        mutationFn: async (mealId) => {
            const { data } = await axiosSecure.patch(`/requested/${mealId}`, { status: "delivered" })
            return data
        },
        onSuccess: async (data) => {
            console.log(data)
            refetch()
        }
    })

    const handleServe = (mealId) => {
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
        <tr className="hover">
            <th>{index++}</th>
            <td>{meal?.title}</td>
            <td>{meal?.email}</td>
            <td>{meal?.name}</td>
            <td>{meal?.status}</td>
            <td>
                <button className='btn btn-sm btn-success' onClick={() => handleServe(meal?._id)}>Serve</button>
            </td>
        </tr>
    )
}

ServeMealsDataRow.propTypes = {
    meal: PropTypes.object,
    index: PropTypes.number,
    refetch: PropTypes.func
}

export default ServeMealsDataRow