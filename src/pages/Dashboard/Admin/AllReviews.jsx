import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AllReviewsDataRow from "../../../components/Dashboard/TableRows/AllReviewsDataRow";

const AllReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ['reviews', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/reviews')
      return data
    }
  })

  

  return (
    <div className="relative top-20 md:top-0">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Meal</th>
              <th>Name</th>
              <th>Likes</th>
              <th>Review</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              reviews?.map(review => <AllReviewsDataRow key={review?._id} review={review} refetch={refetch} />)
            }
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default AllReviews