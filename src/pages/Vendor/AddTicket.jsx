import React, { useState } from "react";
import { useForm } from "react-hook-form";


import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AddTicket = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const imageKey = import.meta.env.VITE_image_host_key;
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${imageKey}`;

    // React Hook Form
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            // Upload image
            const formData = new FormData();
            formData.append("image", data.image[0]);

            const imgRes = await fetch(uploadUrl, {
                method: "POST",
                body: formData,
            });
            const imgData = await imgRes.json();

            if (!imgData.success) {
                Swal.fire("Image Upload Failed", "Please try again", "error");
                setLoading(false);
                return;
            }

            // Build ticket object
            const newTicket = {
                title: data.title,
                from: data.from,
                to: data.to,
                transport: data.transport,
                price: Number(data.price),
                quantity: Number(data.quantity),
                departureDate: data.departureDate,
                departureTime: data.departureTime,
                perks: data.perks || [],
                image: imgData.data.url,
                vendorName: user?.displayName,
                vendorEmail: user?.email,
                verificationStatus: "pending",
                createdAt: new Date(),
            };

            // Save to DB
            const res = await axiosSecure.post("/tickets", newTicket);

            if (res.data.success) {
                Swal.fire("Success!", "Ticket added successfully!", "success");
                reset();
            }

        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to add ticket", "error");
        }

        setLoading(false);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Add New Ticket</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">

                {/* Title */}
                <input
                    {...register("title", { required: true })}
                    type="text"
                    placeholder="Ticket Title"
                    className="input input-bordered w-full"
                />

                {/* From & To */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        {...register("from", { required: true })}
                        type="text"
                        placeholder="From"
                        className="input input-bordered w-full"
                    />

                    <input
                        {...register("to", { required: true })}
                        type="text"
                        placeholder="To"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Transport */}
                <select
                    {...register("transport", { required: true })}
                    className="select select-bordered"
                >
                    <option value="Bus">Bus</option>
                    <option value="Train">Train</option>
                    <option value="Launch">Launch</option>
                    <option value="Plane">Plane</option>
                </select>

                {/* Price & Quantity */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        {...register("price", { required: true })}
                        type="number"
                        placeholder="Price (per ticket)"
                        className="input input-bordered w-full"
                    />

                    <input
                        {...register("quantity", { required: true })}
                        type="number"
                        placeholder="Quantity"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        {...register("departureDate", { required: true })}
                        type="date"
                        className="input input-bordered w-full"
                    />

                    <input
                        {...register("departureTime", { required: true })}
                        type="time"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Perks */}
                <div>
                    <p className="font-semibold mb-2">Perks:</p>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" {...register("perks")} value="AC" /> AC
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" {...register("perks")} value="Breakfast" /> Breakfast
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" {...register("perks")} value="WiFi" /> WiFi
                    </label>
                </div>

                {/* Image Upload */}
                <input
                    {...register("image", { required: true })}
                    type="file"
                    className="file-input file-input-bordered"
                />

                {/* Vendor Info */}
                <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="input input-bordered"
                />

                <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="input input-bordered"
                />

                {/* Submit */}
                <button disabled={loading} className="btn btn-primary w-full">
                    {loading ? "Adding..." : "Add Ticket"}
                </button>
            </form>
        </div>
    );
};

export default AddTicket;
