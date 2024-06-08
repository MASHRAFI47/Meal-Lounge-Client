import { useParams } from "react-router-dom"
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

import Rating from 'react-rating'

import emptyStar from '../../assets/images/emptystar.png'
import star from '../../assets/images/star.png'

const MealDetails = () => {
    const { loading } = useAuth()
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();

    // eslint-disable-next-line no-unused-vars
    const { data: meal = [], isLoading, refetch } = useQuery({
        queryKey: ['meal'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/meal/${id}`)
            return data
        }
    })

    if (isLoading || loading) return <LoadingSpinner />


    return (
        <div className="relative top-40">
            <div className="container mx-auto mb-10">
                <div className="">
                    <div className="space-y-2 mb-5">
                        <h1 className="text-3xl"><span className="font-bold">Item:</span> {meal?.title}</h1>
                        <h1 className="text-2xl"><span className="font-semibold">Description:</span> {meal?.description}</h1>
                        <h3 className="text-2xl font-semibold text-red-600"><span>Price:</span> ${meal?.price}</h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 mb-4">
                    <div className="col-span-3">
                        <img src={meal?.image} className="rounded-lg w-full" alt="" />
                    </div>
                    <div className="ml-0 md:ml-5 space-y-2">
                        <h3 className="text-2xl"><span className="font-semibold">Distributor:</span> {meal?.adminName}</h3>
                        <h3 className="text-2xl"><span className="font-semibold">Ingredients:</span> {meal?.ingredients}</h3>
                        <h3 className="text-2xl"><span className="font-semibold">Rating:</span>
                            <Rating
                                emptySymbol={<img src={emptyStar} className="icon w-4 mr-1" />}
                                fullSymbol={<img src={star} className="icon w-4" />}
                                initialRating={meal?.rating}
                                readonly
                            />
                        </h3>
                        <h3 className="text-2xl"><span className="font-semibold">Likes:</span> {meal?.likes}</h3>
                        <button className="btn bg-[#CA301B] hover:bg-[#ff3535] text-white">Request</button>
                    </div>
                </div>

                <div className="mt-10">
                    <p className="text-xl"> <span className="font-semibold">Reviews:</span> {meal?.reviews}</p>
                </div>
            </div>
        </div>
    )
}

export default MealDetails