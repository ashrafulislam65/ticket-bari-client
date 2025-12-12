import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Vendor = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const vendorRequest = {
            name: data.name,
            email: user.email,
            phone: data.phone,
            address: data.address,
            nid: data.nid,
            businessName: data.businessName,
            licenseNumber: data.licenseNumber,
            photo: user.photoURL,
            role: "pendingVendor",
            requestStatus: "pending",
            requestDate: new Date().toISOString(),
        };

        const res = await axiosSecure.post("/vendor-request", vendorRequest);

        if (res.data.insertedId) {
            Swal.fire({
                title: "Request Submitted!",
                text: "Your vendor request is submitted. Please wait for admin approval.",
                icon: "success",
                confirmButtonColor: "#3085d6",
            });
            reset();
        } else {
            Swal.fire({
                title: "Already Submitted!",
                text: "You already have a pending vendor request.",
                icon: "warning",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="bg-base-200 shadow-xl rounded-2xl p-10 border border-gray-300">
                
                <h1 className="text-4xl font-bold mb-8 text-center text-primary">
                    Vendor Registration Form
                </h1>

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* 2 Column Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Full Name */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1">Full Name</label>
                            <input
                                defaultValue={user.displayName}
                                {...register("name", { required: true })}
                                className="input input-bordered w-full"
                            />
                            {errors.name && <p className="text-red-600 text-sm">Name is required</p>}
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1">Phone Number</label>
                            <input
                                {...register("phone", { required: true })}
                                placeholder="01XXXXXXXXX"
                                className="input input-bordered w-full"
                            />
                            {errors.phone && <p className="text-red-600 text-sm">Phone required</p>}
                        </div>

                        {/* Address */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="font-semibold mb-1">Address</label>
                            <input
                                {...register("address", { required: true })}
                                placeholder="Your full address"
                                className="input input-bordered w-full"
                            />
                            {errors.address && <p className="text-red-600 text-sm">Address required</p>}
                        </div>

                        {/* NID */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1">NID Number</label>
                            <input
                                {...register("nid", { required: true })}
                                placeholder="Your National ID Number"
                                className="input input-bordered w-full"
                            />
                            {errors.nid && <p className="text-red-600 text-sm">NID is required</p>}
                        </div>

                        {/* Business Name */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1">Business Name</label>
                            <input
                                {...register("businessName", { required: true })}
                                placeholder="Your business/brand name"
                                className="input input-bordered w-full"
                            />
                            {errors.businessName && (
                                <p className="text-red-600 text-sm">Business name required</p>
                            )}
                        </div>

                        {/* Trade License */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="font-semibold mb-1">Trade License Number</label>
                            <input
                                {...register("licenseNumber", { required: true })}
                                placeholder="Trade license number"
                                className="input input-bordered w-full"
                            />
                            {errors.licenseNumber && (
                                <p className="text-red-600 text-sm">Trade license required</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-8 text-lg py-3 rounded-xl"
                    >
                        Submit Vendor Application
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Vendor;
