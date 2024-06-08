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
            <div className='bg-white text-center py-10 w-96'>
                <Elements stripe={stripePromise}>
                    {/* checkout form */}
                    <CheckoutForm membership={membership} />
                </Elements>
            </div>
        </div>
    )
}

export default Checkout