import React from 'react';
import { useForm } from 'react-hook-form';

const BookTicket = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = (data) => {
        console.log("Booking Data:", data);
    };
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
            <div className="card w-full max-w-xl bg-base-100 shadow-xl">
                <div className="card-body space-y-4">

                    <h2 className="card-title text-2xl font-bold mb-4">
                        🎟️ Ticket Booking Form
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* User Name */}
                        <div className="form-control w-full">
                            <label className="label pb-1">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="input input-bordered w-full p-3"
                                {...register("fullName", { required: "Name is required" })}
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="form-control w-full">
                            <label className="label pb-1">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                className="input input-bordered w-full p-3"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Ticket Type */}
                        <div className="form-control w-full">
                            <label className="label pb-1">
                                <span className="label-text font-medium">Ticket Type</span>
                            </label>
                            <select
                                className="select select-bordered w-full p-3"
                                {...register("ticketType", { required: true })}
                            >
                                <option value="">Select Ticket Type</option>
                                <option value="standard">Standard</option>
                                <option value="vip">VIP</option>
                                <option value="premium">Premium</option>
                            </select>
                            {errors.ticketType && (
                                <p className="text-red-500 text-sm mt-1">Ticket type is required</p>
                            )}
                        </div>

                        {/* Number of Tickets */}
                        <div className="form-control w-full">
                            <label className="label pb-1">
                                <span className="label-text font-medium">Number of Tickets</span>
                            </label>
                            <input
                                type="number"
                                min="1"
                                className="input input-bordered w-full p-3"
                                {...register("quantity", { required: true })}
                            />
                            {errors.quantity && (
                                <p className="text-red-500 text-sm mt-1">Please enter ticket quantity</p>
                            )}
                        </div>

                        {/* Event Date */}
                        <div className="form-control w-full">
                            <label className="label pb-1">
                                <span className="label-text font-medium">Event Date</span>
                            </label>
                            <input
                                type="date"
                                className="input input-bordered w-full p-3"
                                {...register("date", { required: true })}
                            />
                            {errors.date && (
                                <p className="text-red-500 text-sm mt-1">Date is required</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button className="btn btn-primary w-full mt-4 p-3">
                            Book Ticket
                        </button>
                    </form>

                </div>
            </div>
        </div>

    );
};

export default BookTicket;