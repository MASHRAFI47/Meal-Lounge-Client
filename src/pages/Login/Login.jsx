import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import toast from "react-hot-toast"

const Login = () => {
    const navigate = useNavigate()
    const { signInUser } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        const { email, password } = data;
        signInUser(email, password)
            .then(result => {
                toast.success("Sign In Successful")
                navigate('/')
                console.log(result.user)
            })
    }

    return (
        <div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border mx-auto">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-2xl font-bold text-center">Sign In</h1>
                    <p className="text-center text-neutral-500">Sign in to access your account</p>
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
                        {errors.password && <span className="text-red-600">This field is required</span>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#CA301B] hover:bg-[#ff3535] text-white">Login</button>
                    </div>

                    <p className="text-center">New user? <Link to={'/register'} className="font-bold hover:text-red-600">Register Now</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login