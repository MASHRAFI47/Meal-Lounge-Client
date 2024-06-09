import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { imageUpload } from "../../hooks/imageUpload";

const UpdateMeal = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth()

    const { id } = useParams();
    const axiosSecure = useAxiosSecure()

    // eslint-disable-next-line no-unused-vars
    const { data: meal = [], isLoading, refetch } = useQuery({
        queryKey: ['meal', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/meal/${id}`)
            return data
        }
    })


    const { mutateAsync } = useMutation({
        mutationFn: async (res) => {
            const { data } = await axiosSecure.put(`/meal/${id}`, res)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
        }
    })


    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        const { image } = data

        try {
            const pic = image[0]
            const image_url = await imageUpload(pic)
            await mutateAsync({...data, image: image_url})
            refetch()
            navigate('/dashboard/all-meals')
        } catch (error) {
            console.log(error.message)
        }
    }

    if (isLoading || loading) return <LoadingSpinner />


    return (
        <div>
            <div className="card shrink-0 w-full max-w-4xl shadow-2xl bg-base-100 border mx-auto">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-2xl font-bold'>Update Meal</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title*</span>
                        </label>
                        <input type="text" placeholder="title" className="input input-bordered w-full" defaultValue={meal?.title} {...register("title", { required: true })} />
                        {errors.title && <span className='text-red-600'>This field is required</span>}
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <Select {...register("category", { required: true })}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
              />
              {errors.category && <span className='text-red-600'>This field is required</span>}
            </div> */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select className="select select-bordered w-full" defaultValue={meal?.category} {...register("category", { required: true })}>
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
                            <input type="file" className="file-input file-input-bordered w-full"  {...register("image", { required: true })} />
                            {errors.image && <span className='text-red-600'>This field is required</span>}
                        </div>
                    </div>

                    <div className="form-control">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Ingredients*</span>
                            </label>
                            <input type="text" placeholder="ingredients" className="input input-bordered w-full" defaultValue={meal?.ingredients} {...register("ingredients", { required: true })} />
                            {errors.ingredients && <span className='text-red-600'>This field is required</span>}
                        </div>
                    </div>

                    <div className="form-control">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description*</span>
                            </label>
                            <textarea className="textarea textarea-bordered" placeholder="type here..." defaultValue={meal?.description} {...register("description", { required: true })}></textarea>
                            {errors.description && <span className='text-red-600'>This field is required</span>}
                        </div>
                    </div>


                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className="form-control">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price*</span>
                                </label>
                                <input type="number" placeholder="price" className="input input-bordered" defaultValue={meal?.price} {...register("price", { required: true })} />
                                {errors.price && <span className='text-red-600'>This field is required</span>}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Rating*</span>
                            </label>
                            <select className="select select-bordered w-full" defaultValue={meal?.rating} {...register("rating", { required: true })}>
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
                                <input type="number" placeholder="likes" className="input input-bordered" defaultValue={meal?.likes} {...register("likes", { required: true })} />
                                {errors.likes && <span className='text-red-600'>This field is required</span>}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Reviews*</span>
                            </label>
                            <input type="text" placeholder="reviews" className="input input-bordered" defaultValue={meal?.reviews} {...register("reviews", { required: true })} />
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
                        <button className="btn bg-[#CA301B] hover:bg-[#ff3535] text-white">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateMeal