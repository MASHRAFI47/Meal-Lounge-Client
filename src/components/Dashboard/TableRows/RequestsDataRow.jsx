import { useMutation } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const RequestsDataRow = ({ meal, refetch }) => {
    const axiosSecure = useAxiosSecure()

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/requested/${id}`)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            refetch()
        }
    })

    const handleCancel = (id) => {
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
                mutateAsync(id)
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
                    </div>
                </div>
            </td>
            <td>
                {meal?.likes}
            </td>
            <td>{meal?.reviews}</td>
            <td>{meal?.status}</td>
            <th>
                <button className="btn btn-success btn-xs" onClick={() => handleCancel(meal?._id)}>Cancel</button>
            </th>
        </tr>
    )
}


RequestsDataRow.propTypes = {
    meal: PropTypes.object,
    refetch: PropTypes.func
}

export default RequestsDataRow