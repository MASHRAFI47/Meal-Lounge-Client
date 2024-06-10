import { useParams } from "react-router-dom"
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

import Rating from 'react-rating'

import emptyStar from '../../assets/images/emptystar.png'
import star from '../../assets/images/star.png'
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const MealDetails = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const { user, loading } = useAuth()
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();

    // eslint-disable-next-line no-unused-vars
    const { data: meal = {}, isLoading } = useQuery({
        queryKey: ['meal', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/meal/${id}`)
            return data
        }
    })

    //load users data from db
    const { data: userInfo = {}, } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/user/${user?.email}`)
            return data
        }
    })

    //insert meals data in requested
    const { mutateAsync } = useMutation({
        mutationFn: async (mealData) => {
            const { data } = await axiosSecure.post(`/requested`, mealData)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
        }
    })


    //load all reviews 
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/reviews')
            return data
        }
    })
    console.log(reviews)

    //review submit

    const onSubmit = data => {
        // eslint-disable-next-line no-unused-vars
        const { _id, ...destUser } = userInfo;
        // eslint-disable-next-line no-unused-vars
        const { _id: uid, ...destMeal } = meal
        fetch(`http://localhost:4000/reviews`, {
            credentials: 'include',
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ ...data, ...destMeal, ...destUser, mealId: uid })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                reset()
                refetch()
            })
    }



    if (isLoading || loading) return <LoadingSpinner />


    const filteredReview = reviews.filter(review => review.mealId == id);
    console.log(filteredReview)



    const handleMealRequest = () => {
        if (userInfo.membership !== "silver" && userInfo.membership !== "gold" && userInfo.membership !== "platinum") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No package found!",
                footer: '<a href="#">Buy a Package Now</a>'
            });
        }
        // eslint-disable-next-line no-unused-vars
        const { _id, ...finalUserinfo } = userInfo
        // eslint-disable-next-line no-unused-vars
        const { _id: id, ...finalMealInfo } = meal
        if (userInfo.membership == "silver" || userInfo.membership == "gold" || userInfo.membership == "platinum") {
            toast.success("Requested")
            mutateAsync({ ...finalUserinfo, ...finalMealInfo, mealId: meal?._id, status: "requested" })
        }
    }


    return (
        <div className="relative top-40">
            <div className="container mx-auto mb-10">
                <div className="">
                    <div className="space-y-2 mb-5">
                        <h1 className="text-2xl font-bold"><span className="font-bold">Item:</span> {meal?.title}</h1>
                        <h1 className="text-xl"><span className="font-semibold">Description:</span> {meal?.description}</h1>
                        <h3 className="text-xl font-semibold text-red-600"><span>Price:</span> ${meal?.price}</h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 mb-4">
                    <div className="col-span-3">
                        <img src={meal?.image} className="rounded-lg w-full" alt="" />
                    </div>
                    <div className="ml-0 md:ml-5 space-y-2">
                        <h3 className="text-xl"><span className="font-semibold">Distributor:</span> {meal?.adminName}</h3>
                        <h3 className="text-xl"><span className="font-semibold">Ingredients:</span> {meal?.ingredients}</h3>
                        <h3 className="text-xl"><span className="font-semibold">Rating:</span>
                            <Rating
                                emptySymbol={<img src={emptyStar} className="icon w-4 mr-1" />}
                                fullSymbol={<img src={star} className="icon w-4" />}
                                initialRating={meal?.rating}
                                readonly
                            />
                        </h3>
                        <h3 className="text-xl"><span className="font-semibold">Likes:</span> {meal?.likes}</h3>
                        <button className="btn bg-[#CA301B] hover:bg-[#ff3535] text-white" onClick={handleMealRequest}>Request</button>
                    </div>
                </div>

                <div className="mt-10">
                    <p className="text-xl"> <span className="font-semibold">Reviews:</span> </p>


                    <form onSubmit={handleSubmit(onSubmit)}>
                        <textarea className="textarea textarea-bordered w-full mt-2" placeholder="Write a review..." {...register("review", { required: true })}></textarea>
                        {errors.review && <span className="text-red-600">This field is required</span>}

                        <div className="form-control mt-6">
                            <button className="btn btn-success">Add</button>
                        </div>
                    </form>

                    {
                        filteredReview.map(review => <div key={review?._id}>
                            <div className="my-5">
                                <p className="font-bold text-purple-600 text-xl">{review?.name}</p>
                                <p className="text-xl">{review?.review}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default MealDetails