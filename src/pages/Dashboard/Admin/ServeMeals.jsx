import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ServeMealsDataRow from "../../../components/Dashboard/TableRows/ServeMealsDataRow";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const ServeMeals = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure()

  const { data: reqMeals = [], isLoading } = useQuery({
    queryKey: ['reqMeal', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/requests/requested`)
      return data
    }
  })

  if (isLoading || loading) return <LoadingSpinner />

  return (
    <div>
      <div className="mt-20 md:mt-0">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Sl.</th>
                <th>Title</th>
                <th>Email</th>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                reqMeals.map((meal, index) => <ServeMealsDataRow key={meal?._id} index={index + 1} meal={meal} />)
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ServeMeals