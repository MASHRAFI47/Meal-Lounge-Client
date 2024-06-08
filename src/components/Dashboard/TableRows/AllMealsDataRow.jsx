import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//icons
import { FaRegTrashCan } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";

import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { useForm } from "react-hook-form";
// import useAuth from '../../../hooks/useAuth';



const AllMealsDataRow = ({ meal, refetch }) => {
    // const { user } = useAuth()
    // const { register, handleSubmit, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);


    const axiosSecure = useAxiosSecure()

    const { mutateAsync } = useMutation({
        mutationFn: async (mealId) => {
            const { data } = await axiosSecure.delete(`/meal/${mealId}`)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            refetch()
        }
    })

    const handleDelete = (mealId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(mealId)

                mutateAsync(mealId)

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={meal?.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{meal?.title}</div>
                        <div className="text-sm opacity-50">{meal?.likes} likes</div>
                    </div>
                </div>
            </td>
            <td>{meal?.adminName}</td>
            <td className='w-96'>
                {meal?.reviews}
                {/* <br />
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
            </td>
            <th className='space-x-2'>
                {/* <button className="btn btn-sm bg-green-600 hover:bg-green-500 text-white" onClick={() => document.getElementById('my_modal_3').showModal()}><BsPencilSquare /></button> */}

                {/* <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <div className="card shrink-0 w-full max-w-sm mx-auto">
                            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Title*</span>
                                    </label>
                                    <input type="text" placeholder="title" className="input input-bordered w-full" defaultValue={mealData?.title} {...register("title", { required: true })} />
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
                                            <input type="text" placeholder="price" className="input input-bordered" {...register("price", { required: true })} />
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
                                            <input type="text" placeholder="likes" className="input input-bordered" {...register("likes", { required: true })} />
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
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                </dialog> */}

                <Link className="btn btn-sm bg-green-600 hover:bg-green-500 text-white" to={`/update-meal/${meal?._id}`}><BsPencilSquare /></Link>
                <button className="btn btn-sm bg-red-600 hover:bg-red-500 text-white" onClick={() => handleDelete(meal?._id)}><FaRegTrashCan /></button>
                <Link to={`/meal-details/${meal?._id}`} className='btn btn-sm text-white relative bottom-[2px] btn-primary'>View</Link>
            </th>
        </tr>
    )
}

AllMealsDataRow.propTypes = {
    meal: PropTypes.object,
    refetch: PropTypes.func,
}



export default AllMealsDataRow