import { useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider/AuthProvider"
import { useForm } from "react-hook-form";
import { imageUpload } from "../../hooks/imageUpload";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        const { email, password, fullName, image } = data;
        const displayImage = image[0];

        try {
            const picture = await imageUpload(displayImage)
            createUser(email, password)
                .then(() => {
                    updateUserProfile(fullName, picture)
                        .then(() => {
                            toast.success("Registration Successful");
                            navigate('/')
                        })
                })
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border mx-auto">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                    <p className="text-center text-neutral-500">Welcome to meal lounge</p>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="full name" className="input input-bordered" {...register("fullName", { required: true })} />
                        {errors.fullName && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" {...register("image", { required: true })} />
                        {errors.image && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                        {errors.email && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" {...register("password", { required: true })} />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        {errors.password && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#CA301B] hover:bg-[#ff3535] text-white">Register</button>
                    </div>

                    <p className="text-center">Already a user? <Link to={'/login'} className="font-bold hover:text-red-600">Login Now</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register