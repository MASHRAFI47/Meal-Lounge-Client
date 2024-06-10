import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import PaymentDataRow from "../../../components/Dashboard/TableRows/PaymentDataRow";

const PaymentHistory = () => {
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
    console.log(filteredMeal)

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl.</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                           filteredMeal.length > 0 ? 
                           filteredMeal?.map((meal, index) => <PaymentDataRow key={meal?._id} index={index + 1} meal={meal} refetch={refetch} />)
                           :
                           <span className="font-bold text-2xl">No Payment History yet</span>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaymentHistory