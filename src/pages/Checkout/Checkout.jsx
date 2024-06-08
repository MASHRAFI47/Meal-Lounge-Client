import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../../components/Form/CheckoutForm';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const Checkout = () => {
    const axiosSecure = useAxiosSecure();
    const pack = useParams();

    console.log(pack.package)

    const { data: membership = [], isLoading } = useQuery({
        queryKey: ['membership'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/membership/${pack.package}`)
            return data
        }
    })

    if (isLoading) return <LoadingSpinner />

    console.log(membership)

    return (
        <div>
            <div className='text-center py-10'>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border py-20 mx-auto">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Package</span>
                            </label>
                            <input type="text" placeholder="package" className="input input-bordered" value={membership?.packageName} readOnly />
                        </div>
                    </div>
                    <Elements stripe={stripePromise}>
                        {/* checkout form */}
                        <CheckoutForm membership={membership} />
                    </Elements>
                </div>

            </div>
        </div>
    )
}

export default Checkout