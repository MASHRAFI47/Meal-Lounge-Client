import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import AllMealsDataRow from '../../../components/Dashboard/TableRows/AllMealsDataRow';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';


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

  const [sorted, setSorted] = useState(false)
  const [sortMeal, setSortMeal] = useState(meals)
  console.log(sortMeal)

  const handleSortByPrice = () => {
    const sortedMeals = [...meals].sort((a, b) => parseFloat(a.price) > parseFloat(b.price) ? 1 : -1);
    setSortMeal(sortedMeals)
    setSorted(true)
  }

  const handleSortByLikes = () => {
    const sortedMeals = [...meals].sort((a, b) => parseFloat(a.likes) > parseFloat(b.likes) ? 1 : -1);
    setSortMeal(sortedMeals)
    setSorted(true)
  }


  //workkk
  const handleSortByReviews = () => {
    const sortedMeals = [...meals].sort((a, b) => parseFloat(a.likes) > parseFloat(b.likes) ? 1 : -1);
    setSortMeal(sortedMeals)
    setSorted(true)
  }



  if (isLoading) return <LoadingSpinner />

  return (
    <div className=''>
      {/* dropdown */}
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1 btn-success">Sort</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li onClick={handleSortByPrice}><a>Sort by price</a></li>
          <li onClick={handleSortByLikes}><a>Sort by likes</a></li>
          <li onClick={handleSortByReviews}><a>Sort by reviews</a></li>
        </ul>
      </div>

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
              sorted ? sortMeal?.map(meal => <AllMealsDataRow key={meal._id} meal={meal} refetch={refetch} />) : meals?.map(meal => <AllMealsDataRow key={meal._id} meal={meal} refetch={refetch} />)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllMeals