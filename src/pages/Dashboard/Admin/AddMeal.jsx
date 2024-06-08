// import Select from 'react-select'
// import makeAnimated from 'react-select/animated';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { imageUpload } from '../../../hooks/imageUpload';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

// const options = [
//   { value: 'breakfast', label: 'Breakfast' },
//   { value: 'lunch', label: 'Lunch' },
//   { value: 'dinner', label: 'Dinner' }
// ]

// const animatedComponents = makeAnimated();


const AddMeal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (newData) => {
      const { data } = await axiosSecure.post(`/meals`, newData)
      return data
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success("Meal data inserted successfully")
      navigate('/dashboard/all-meals')
    }
  })


  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async data => {
    console.log(data)
    const { image } = data;
    const imageFile = image[0];



    try {
      // const { adminEmail, adminName, category, description, image: imageFile, ingredients, likes, price, rating, reviews, title } = data;

      const image_url = await imageUpload(imageFile)

      const newData = { ...data, image: image_url };

      await mutateAsync(newData)

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div>
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
    </div>
  )
}

export default AddMeal