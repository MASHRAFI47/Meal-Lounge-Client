import { useParams } from "react-router-dom"
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const MealDetails = () => {
    const { loading } = useAuth()
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();

    const { data: meal = [], isLoading, refetch } = useQuery({
        queryKey: ['meal'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/meal/${id}`)
            return data
        }
    })

    if (isLoading || loading) return <LoadingSpinner />

    console.log(meal)

    console.log(id)
    return (
        <div>MealDetails</div>
    )
}

export default MealDetails