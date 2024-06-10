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
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Serve it!"
        }).then((result) => {
            if (result.isConfirmed) {

                console.log(mealId)
                mutateAsync(mealId)

                Swal.fire({
                    title: "Served!",
                    text: "Your meal has been delivered.",
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