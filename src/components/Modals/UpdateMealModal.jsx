

const UpdateMealModal = () => {
    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <div className="card shrink-0 w-full max-w-sm mx-auto">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title*</span>
                                </label>
                                <input type="text" placeholder="title" className="input input-bordered w-full" defaultValue={meal?.title} {...register("title", { required: true })} />
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
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {/* <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
                </div>
            </dialog>
        </div>
    )
}

export default UpdateMealModal