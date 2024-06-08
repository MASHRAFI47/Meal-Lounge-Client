import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../../components/Form/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const Checkout = () => {
    return (
        <div>
            <div className='bg-white text-center py-10 w-96'>
                <Elements stripe={stripePromise}>
                    {/* checkout form */}
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    )
}

export default Checkout