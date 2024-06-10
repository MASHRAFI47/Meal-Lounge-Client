import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import RequestsDataRow from "../../../components/Dashboard/TableRows/RequestsDataRow";

const RequestedMeals = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['requests', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/requests`)
            return data
        }
    })

    const filteredMeal = requests.filter(meal => meal?.email == user?.email);

    if (isLoading) return <LoadingSpinner />

    console.log(requests)

    return (
        <div className="relative top-20 md:top-0">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>likes</th>
                            <th>Review</th>
                            <th>Request</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        
                        {
                            filteredMeal.map(meal => <RequestsDataRow key={meal?._id} meal={meal} refetch={refetch} />)
                        }
                    </tbody>
                    {/* foot */}
                </table>
            </div>
        </div>
    )
}

export default RequestedMeals