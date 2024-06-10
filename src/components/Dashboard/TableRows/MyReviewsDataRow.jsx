import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';


const MyReviewsDataRow = ({ review, refetch }) => {

    const axiosSecure = useAxiosSecure();
    let [isOpen, setIsOpen] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/reviews/${id}`)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            refetch()
        }
    })

    const onSubmit = data => {
        fetch(`https://meal-lounge-server.vercel.app/reviews/${review?._id}`, {
            credentials: "include",
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setIsOpen(false)
                toast.success("Edited")
                refetch()
            })
    };

    const handleDelete = (id) => {
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
                mutateAsync(id);
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
                            <img src={review?.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{review?.title}</div>
                    </div>
                </div>
            </td>
            <td>
                {review?.likes}
            </td>
            <td>{review?.review}</td>
            <th className='space-x-2'>
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                    <BsPencilSquare />
                </Button>
                <Transition appear show={isOpen}>
                    <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <TransitionChild
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 transform-[scale(95%)]"
                                    enterTo="opacity-100 transform-[scale(100%)]"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 transform-[scale(100%)]"
                                    leaveTo="opacity-0 transform-[scale(95%)]"
                                >
                                    <DialogPanel className="w-full max-w-md rounded-xl bg-neutral-600 p-6 backdrop-blur-2xl">
                                        <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                            Edit Review
                                        </DialogTitle>
                                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-control">
                                                <textarea className="textarea textarea-bordered" placeholder="Edit your review..." defaultValue={review?.review} {...register("review", { required: true })}></textarea>
                                                {errors.review && <span className='text-red-600'>This field is required</span>}
                                            </div>
                                            <div className="form-control mt-6">
                                                <button className="btn btn-success">Update</button>
                                            </div>
                                        </form>
                                        {/* <div className="mt-4">
                                            <Button
                                                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Got it, thanks!
                                            </Button>
                                        </div> */}
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <button className="btn btn-sm bg-red-600 hover:bg-red-500 text-white" onClick={() => handleDelete(review?._id)} ><FaRegTrashCan /></button>
                <Link className='btn btn-sm text-white relative bottom-[2px] btn-primary' to={`/meal-details/${review?.mealId}`}>View</Link>
            </th>
        </tr>
    )
}


MyReviewsDataRow.propTypes = {
    review: PropTypes.object,
    refetch: PropTypes.func,
}

export default MyReviewsDataRow