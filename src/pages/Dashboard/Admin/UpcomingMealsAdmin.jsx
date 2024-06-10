import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../../../hooks/useAxiosCommon"
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner"
import UpcomingMealsAdminRow from "../../../components/Dashboard/TableRows/UpcomingMealsAdminRow"
import { imageUpload } from "../../../hooks/imageUpload"
import { useForm } from "react-hook-form"
import useAuth from "../../../hooks/useAuth"

const UpcomingMealsAdmin = () => {
    const axiosCommon = useAxiosCommon()

    const { user } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        const { image } = data;
        const pic = image[0];

        const imageUrl = await imageUpload(pic)

        const mealData = { ...data, image: imageUrl }

        fetch(`http://localhost:4000/meals`, {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(mealData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    const { data: meals = [], isLoading, refetch } = useQuery({
        queryKey: ["meals"],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/meals')
            return data
        }
    })

    const filteredMeals = meals.filter(meal => meal.likes < 10);
    const sortedMeals = filteredMeals.sort((a, b) => parseFloat(a.likes) > parseFloat(b.likes) ? -1 : 1)
    console.log(sortedMeals)

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Likes</th>
                            <th>Review</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            sortedMeals?.map(meal => <UpcomingMealsAdminRow key={meal?._id} meal={meal} refetch={refetch} />)
                        }
                    </tbody>
                    {/* foot */}
                </table>

                {/* Add Upcoming Meal */}
                <button className="btn btn-success btn-md  font-bold w-full mr-0 my-auto" onClick={() => document.getElementById('my_modal_3').showModal()}>Add Meal</button>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>

                        <div className="card shrink-0 w-full max-w-4xl shadow-2xl bg-base-100 border mx-auto">
                            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                                <h1 className='text-2xl font-bold'>Add Meal</h1>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Title*</span>
                                    </label>
                                    <input type="text" placeholder="title" className="input input-bordered w-full" {...register("title", { required: true })} />
                                    {errors.title && <span className='text-red-600'>This field is required</span>}
                                </div>


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Category*</span>
                                        </label>
                                        <select className="select select-bordered w-full" {...register("category", { required: true })}>
                                            <option disabled selected>breakfast</option>
                                            <option>breakfast</option>
                                            <option>lunch</option>
                                            <option>dinner</option>
                                        </select>
                                        {errors.category && <span className='text-red-600'>This field is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Image*</span>
                                        </label>
                                        <input type="file" className="file-input file-input-bordered w-full" {...register("image", { required: true })} />
                                        {errors.image && <span className='text-red-600'>This field is required</span>}
                                    </div>
                                </div>

                                <div className="form-control">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Ingredients*</span>
                                        </label>
                                        <input type="text" placeholder="ingredients" className="input input-bordered w-full" {...register("ingredients", { required: true })} />
                                        {errors.ingredients && <span className='text-red-600'>This field is required</span>}
                                    </div>
                                </div>

                                <div className="form-control">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Description*</span>
                                        </label>
                                        <textarea className="textarea textarea-bordered" placeholder="type here..." {...register("description", { required: true })}></textarea>
                                        {errors.description && <span className='text-red-600'>This field is required</span>}
                                    </div>
                                </div>


                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <div className="form-control">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Price*</span>
                                            </label>
                                            <input type="number" placeholder="price" className="input input-bordered" {...register("price", { required: true })} />
                                            {errors.price && <span className='text-red-600'>This field is required</span>}
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Rating*</span>
                                        </label>
                                        <select className="select select-bordered w-full" {...register("rating", { required: true })}>
                                            <option disabled selected>5</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                        {errors.rating && <span className='text-red-600'>This field is required</span>}
                                    </div>
                                </div>


                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <div className="form-control">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Likes*</span>
                                            </label>
                                            <input type="number" placeholder="likes" className="input input-bordered" min="1" max="10" {...register("likes", { required: true })} />
                                            {errors.likes && <span className='text-red-600'>This field is required</span>}
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Reviews*</span>
                                        </label>
                                        <input type="text" placeholder="reviews" className="input input-bordered" {...register("reviews", { required: true })} />
                                        {errors.reviews && <span className='text-red-600'>This field is required</span>}
                                    </div>
                                </div>


                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <div className="form-control">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Admin Name*</span>
                                            </label>
                                            <input type="text" placeholder="email" className="input input-bordered" defaultValue={user?.displayName} readOnly {...register("adminName", { required: true })} />
                                            {errors.adminName && <span className='text-red-600'>This field is required</span>}
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Admin Email*</span>
                                        </label>
                                        <input type="email" placeholder="email" className="input input-bordered" defaultValue={user?.email} readOnly {...register("adminEmail", { required: true })} />
                                        {errors.adminEmail && <span className='text-red-600'>This field is required</span>}
                                    </div>
                                </div>


                                <div className="form-control mt-6">
                                    <button className="btn bg-[#CA301B] hover:bg-[#ff3535] text-white">Add</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </dialog>
            </div>
        </div>
    )
}

export default UpcomingMealsAdmin