import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner"
import { axiosSecure } from "../../../hooks/useAxiosSecure"
import UsersDataRow from "../../../components/Dashboard/TableRows/UsersDataRow"

const ManageUsers = () => {
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data
        }
    })

    if (isLoading) return <LoadingSpinner />


    return (
        <div>
            <h1 className="font-bold text-2xl mb-10">Users Management</h1>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, index) => <UsersDataRow key={user?._id} user={user} index={index + 1} refetch={refetch} />)
                    }
                </tbody>
            </table>

        </div>
    )
}

export default ManageUsers