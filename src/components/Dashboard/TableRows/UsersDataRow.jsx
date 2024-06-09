import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';

const UsersDataRow = ({ user, index, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const { mutateAsync } = useMutation({
        mutationFn: async (userId) => {
            const { data } = await axiosSecure.patch(`/users/${userId}`, { role: 'admin' })
            return data
        },
        onSuccess: (data) => {
            console.log(data);
            refetch()
        }
    })

    const handleAdminRequest = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change role!"
        }).then((result) => {
            if (result.isConfirmed) {

                mutateAsync(userId)

                Swal.fire({
                    title: "Role Changed!",
                    icon: "success"
                });
            }
        });

    }
    return (
        <tr className="hover">
            <th>{index++}</th>
            <td>{user?.name}</td>
            <td>{user?.email}</td>
            <td>{user?.role}</td>
            <td>{user?.membership}</td>
            <td>
                {user?.role == "admin" ? "Already admin" : <button className='btn btn-sm btn-success' onClick={() => handleAdminRequest(user?._id)}>Make Admin</button>}
            </td>
        </tr>
    )
}

UsersDataRow.propTypes = {
    user: PropTypes.object,
    index: PropTypes.number,
    refetch: PropTypes.func
}

export default UsersDataRow