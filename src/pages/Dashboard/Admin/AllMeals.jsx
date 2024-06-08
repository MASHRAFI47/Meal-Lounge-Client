import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import AllMealsDataRow from '../../../components/Dashboard/TableRows/AllMealsDataRow';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';


const AllMeals = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: meals = [], isLoading, refetch } = useQuery({
    queryKey: ['meals', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/meals')
      return data
    }
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className=''>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Distributor</th>
              <th>Reviews</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              meals?.map(meal => <AllMealsDataRow key={meal._id} meal={meal} refetch={refetch} />)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllMeals