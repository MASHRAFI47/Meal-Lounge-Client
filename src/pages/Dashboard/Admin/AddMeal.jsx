import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import useAuth from '../../../hooks/useAuth';

const options = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' }
]

const animatedComponents = makeAnimated();


const AddMeal = () => {
  const {user} = useAuth()

  return (
    <div>
      <div className="card shrink-0 w-full max-w-4xl shadow-2xl bg-base-100 border mx-auto">
        <form className="card-body">
          <h1 className='text-2xl font-bold'>Add Meal</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title*</span>
            </label>
            <input type="email" placeholder="email" className="input input-bordered" required />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Image*</span>
              </label>
              <input type="file" className="file-input file-input-bordered w-full" />
            </div>
          </div>

          <div className="form-control">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Ingredients*</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required />
            </div>
          </div>

          <div className="form-control">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description*</span>
              </label>
              <textarea className="textarea textarea-bordered" placeholder="Bio"></textarea>
            </div>
          </div>


          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className="form-control">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price*</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Rating*</span>
              </label>
              <select className="select select-bordered w-full">
                <option disabled selected>Rating</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>


          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className="form-control">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Likes*</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Reviews*</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required />
            </div>
          </div>


          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className="form-control">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Admin Name*</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" defaultValue={user?.displayName} readOnly />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Admin Email*</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" defaultValue={user?.email} readOnly />
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