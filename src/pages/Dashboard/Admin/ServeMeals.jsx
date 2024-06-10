import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ServeMealsDataRow from "../../../components/Dashboard/TableRows/ServeMealsDataRow";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useState } from "react";

const ServeMeals = () => {
  const [search, setSearch] = useState("")
  // const [searchData, setSearchData] = useState("")
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure()

  // const handleSearch = e => {
  //   e.preventDefault();
  //   const searchText = e.target.search.value;
  //   console.log(searchText)
  //   setSearchData(searchText)
  // }


  const { data: reqMeals = [], isLoading, refetch } = useQuery({
    queryKey: ['reqMeal', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/requests/requested`)
      return data
    }
  })

  if (isLoading || loading) return <LoadingSpinner />




  return (
    <div className="relative top-20 md:top-0">
      <input type="text" onChange={(e) => setSearch(e.target.value)} className="py-3 mb-5 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Search by username..." />
      {/* <form className="md:flex" onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search by username..." />
        <input type="submit" className="btn w-24" value="submit" />
      </form> */}
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
              {/* {
                reqMeals.map((meal, index) => <ServeMealsDataRow key={meal?._id} index={index + 1} meal={meal} refetch={refetch} />)
              } */}
              {
                reqMeals.filter(item => {
                  return search.toLowerCase() == "" ? item : item.title.toLowerCase().includes(search)
                }).map((meal, index) => <ServeMealsDataRow key={meal?._id} index={index + 1} meal={meal} refetch={refetch} />)
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ServeMeals