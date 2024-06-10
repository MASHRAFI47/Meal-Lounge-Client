import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import useAxiosCommon from "../../hooks/useAxiosCommon"
import MealCard from "../../components/Cards/MealCard"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"


// const getArticles = async ({ pageParam = 0 }) => {
//     const res = await fetch(`https://meal-lounge-server.vercel.app/meals?limit=4&offset=${pageParam}`);
//     const data = await res.json();

//     return { ...data, prevOffset: pageParam }
// }



const Meals = () => {
    const axiosCommon = useAxiosCommon()


    const { data: meals = [], isLoading } = useQuery({
        queryKey: ["meals"],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/meals')
            return data
        }
    })


    // const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    //     queryKey: ['mealsData'],
    //     queryFn: getArticles,
    //     getNextPageParam: (lastPage) => {
    //         if (lastPage.prevOffset + 10 > lastPage.articlesCount) {
    //             return false
    //         }
    //         return lastPage.prevOffset + 10
    //     }
    // })

    // console.log(data)

    // const articles = data?.pages.reduce((acc, page) => {
    //     return [...acc, ...page.articles]
    // }, [])
    // console.log(articles)



    //meals greater than 10 likes
    const filteredMeals = meals.filter(meal => meal.likes >= 10);


    if (isLoading) return <LoadingSpinner />

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Meal Lounge | Meals</title>
            </Helmet>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative top-40">
                {
                    filteredMeals.map(meal => <MealCard key={meal?._id} meal={meal} />)
                }
            </div>
        </div>
    )
}

export default Meals