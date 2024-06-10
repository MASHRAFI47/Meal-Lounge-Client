import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import useAuth from "../../../hooks/useAuth";
import MyReviewsDataRow from "../../../components/Dashboard/TableRows/MyReviewsDataRow";

const MyReviews = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ['reviews', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/reviews')
      return data
    }
  })
  console.log(reviews)

  const filteredReview = reviews.filter(review => review.name == user?.displayName)
  console.log(filteredReview)


  return (
    <div className="relative top-20 md:top-0">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Likes</th>
              <th>Reviews</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              filteredReview?.map(review => <MyReviewsDataRow key={review?._id} review={review} refetch={refetch} />)
            }
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default MyReviews