import { useMutation, useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useAxiosCommon from '../../hooks/useAxiosCommon';

//icons
import { AiOutlineLike } from "react-icons/ai";
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';


const UpcomingMealCard = ({ meal, refetch }) => {
    const [liked, setLiked] = useState(false)
    const { user } = useAuth()
    const axiosCommon = useAxiosCommon()

    //ignore id
    // eslint-disable-next-line no-unused-vars
    const { _id: id, ...mealData } = meal
    //get email in mealData
    const likeData = { ...mealData, mealId: meal?._id, email: user?.email }

    const { data: likes = [] } = useQuery({
        queryKey: ['likes'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/likes')
            return data
        }
    })

    const { data: userData } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/user/${user?.email}`)
            return data
        }
    })
    console.log(userData)


    const filteredLikes = likes.filter(like => like.email == user?.email);


    const { mutateAsync } = useMutation({
        mutationFn: async (meal) => {
            // const filteredMealItem = filteredLikes.find(item => item.title == meal.title);
            // if(filteredMealItem) {
            //     if(filteredLikes?.email == user?.email) {
            //         return
            //     }
            //     else {
            //         toast.success("done")
            //     }
            // }
            // console.log(filteredMealItem)
            if (filteredLikes) return
            const { data } = await axiosCommon.patch(`/like-meal/${meal?._id}`, mealData)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            refetch()
        }
    })


    // const { mutation } = useMutation({
    //     mutationFn: async (mealData) => {
    //         const { data } = await axiosCommon.post('/likes', mealData)
    //         return data
    //     },
    //     onSuccess: (data) => {
    //         console.log(data)
    //     }
    // })



    const handleLikeButton = (meal) => {
        if (userData?.membership == "platinum" || userData?.membership == "gold" || userData?.membership == "silver") {
            // console.log(meal)
            mutateAsync(meal)

            fetch(`http://localhost:4000/likes/${user?.email}`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                // likeData
                body: JSON.stringify({ param1: mealData, param2: mealData.title, param3: likeData })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setLiked(true)
                    toast.success("liked")
                })
            // mutation(mealData)
        }
        else {
            toast.error("Only silver/gold/platinum users can like")
        }
    }
    return (
        <div>
            <div className="card card-compact bg-base-100 shadow-xl border ">
                <figure><img src={meal?.image} className='w-[40rem] h-[20rem]' alt={meal?.title} /></figure>
                <div className="card-body">
                    <h2 className="card-title font-bold">{meal?.title}</h2>
                    <h2 className='text-lg font-semibold inline mr-2'>Price: <span className='text-red-600'>${meal?.price}</span></h2>
                    <h2 className='text-lg font-semibold inline mr-2'>Likes: <span className='text-red-600'>{meal?.likes}</span></h2>
                    <button className='btn w-12' disabled={liked} onClick={() => handleLikeButton(meal)}><AiOutlineLike /></button>
                    <div className="card-actions justify-end">
                        <Link className='btn bg-[#CA301B] hover:bg-[#ff3535] text-white' to={`/meal-details/${meal?._id}`}>Details</Link>
                    </div>
                </div>
            </div></div>
    )
}

UpcomingMealCard.propTypes = {
    meal: PropTypes.object,
    refetch: PropTypes.func
}

export default UpcomingMealCard