import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../../../hooks/useAxiosCommon"
import UpcomingMealCard from "../../../components/Cards/UpcomingMealCard"
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner"

const UpcomingMeals = () => {
  const axiosCommon = useAxiosCommon()
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const { data } = await axiosCommon.get('/meals')
      return data
    }
  })

  // meals less than 10 likes
  const filteredMeals = meals.filter(meal => meal.likes < 10);

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 container mx-auto relative top-40">
      {
        filteredMeals.map(meal => <UpcomingMealCard key={meal?._id} meal={meal} />)
      }
    </div>
  )
}

export default UpcomingMeals