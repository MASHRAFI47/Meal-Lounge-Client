import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner"
import { axiosSecure } from "../../../hooks/useAxiosSecure"
import UsersDataRow from "../../../components/Dashboard/TableRows/UsersDataRow"
import useAuth from "../../../hooks/useAuth"

const ManageUsers = () => {
    const { user } = useAuth()
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data
        }
    })

    if (isLoading) return <LoadingSpinner />


    return (
        <div className="">
            <h1 className="font-bold text-2xl mb-10 mt-10 md:mt-0">Users Management</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <UsersDataRow key={user?._id} user={user} index={index + 1} refetch={refetch} />)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ManageUsers