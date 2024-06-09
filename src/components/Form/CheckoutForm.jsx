// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web


import PropTypes from 'prop-types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import './CheckoutForm.css';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

import { ImSpinner2 } from "react-icons/im";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';


const CheckoutForm = ({ membership }) => {



    const pack = membership?.packageName;
    const navigate = useNavigate()
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const [clientSecret, setClientSecret] = useState();
    const [cardError, setCardError] = useState('')
    const [processing, setProcessing] = useState(false)

    //user single logged in data fetch
    const { data: userData = [] } = useQuery({
        queryKey: ['userData', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`)
            return data
        }
    })
    console.log(userData)

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.patch(`/users/${id}`, { membership: pack })
            return data
        },
        onSuccess: (data) => {
            console.log(data)
        }
    })



    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (membership?.price && membership?.price > 1) {
            getClientSecret({ price: membership?.price })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [membership?.price]);

    //get client secret
    const getClientSecret = async price => {
        const { data } = await axiosSecure.post(`/create-payment-intent`, price)
        console.log('client secret from server', data)
        setClientSecret(data.clientSecret)
    }


    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setProcessing(true)

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error.message);
            setCardError(error.message)
            return
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError();
        }

        //confirm payment
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName,
                },
            },
        })

        if (confirmError) {
            console.log(confirmError.message)
            setCardError(confirmError.message)
            setProcessing(false)
            return
        }

        //succeed payment
        if (paymentIntent.status === 'succeeded') {
            console.log(paymentIntent)
            //create object
            const paymentInfo = {
                ...membership,
                userID: membership?._id,
                email: user?.email,
                transactionId: paymentIntent.id,
                date: new Date(),
            }
            delete paymentInfo._id
            console.log(paymentInfo)

            try {
                //post in subscribers
                await axiosSecure.post('/subscribers', paymentInfo)

                //save membership status to users
                // const currentUser = {
                //     email: user?.email,
                //     name: user?.displayName,
                //     role: userData?.role,
                //     status: userData?.status,
                //     timestamp: userData?.timestamp,
                //     membership: pack
                // }
                // await axiosSecure.patch(`/users/${userData?._id}`, { ...userData, membership: pack })
                mutateAsync(userData?._id)

            } catch (error) {
                console.log(error.message)
            }

            setProcessing(false)
            toast.success("Subscribed Successfully")
            navigate('/')
        }

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className='btn bg-[#CA301B] hover:bg-[#ff3535] text-white' disabled={!stripe || !clientSecret || processing}>
                    {processing ? <ImSpinner2 size={24} className='animate-spin m-auto' /> : `Pay ${membership?.price}`}
                </button>
            </form>
            {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
        </>
    );
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.


CheckoutForm.propTypes = {
    membership: PropTypes.object,
}


export default CheckoutForm