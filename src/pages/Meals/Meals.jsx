import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import useAxiosCommon from "../../hooks/useAxiosCommon"
import MealCard from "../../components/Cards/MealCard"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

const Meals = () => {
    const axiosCommon = useAxiosCommon()

    const { data: meals = [], isLoading } = useQuery({
        queryKey: ["meals"],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/meals')
            return data
        }
    })

    if(isLoading) return <LoadingSpinner />

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Meal Lounge | Meals</title>
            </Helmet>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative top-40">
                {
                    meals.map(meal => <MealCard key={meal?._id} meal={meal} />)
                }
            </div>
        </div>
    )
}

export default Meals