import { useMutation } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllReviewsDataRow = ({ review, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/reviews/${id}`)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            refetch()
        }
    })

    const handleDelete = (id) => {
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
                            <img src={review?.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td>{review?.title}</td>
            <td>
                {review?.likes}
            </td>
            <td>{review.review}</td>
            {/* <td>
                {
                    review?.title ? review.length : 'mo'
                }
            </td> */}
            <th>
                <button className="btn btn-success btn-xs" onClick={() => handleDelete(review?._id)}>Delete</button>
            </th>
        </tr>
    )
}

AllReviewsDataRow.propTypes = {
    review: PropTypes.object,
    refetch: PropTypes.func
}

export default AllReviewsDataRow