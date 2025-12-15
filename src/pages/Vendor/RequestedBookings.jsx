import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const RequestedBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ["vendorBookings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/vendor/bookings?vendorEmail=${user?.email}`);
            return res.data.data;
        }
    });

    const handleAccept = async (id) => {
        const res = await axiosSecure.patch(`/bookings/accept/${id}`);
        if (res.data.success) {
            Swal.fire("Accepted!", "Booking has been accepted.", "success");
            refetch();
        }
    };

    const handleReject = async (id) => {
        const res = await axiosSecure.patch(`/bookings/reject/${id}`);
        if (res.data.success) {
            Swal.fire("Rejected!", "Booking has been rejected.", "error");
            refetch();
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Requested Bookings ({bookings.length})</h2>

            <div className="overflow-x-auto border rounded-lg">
                <table className="table table-zebra w-full min-w-[600px]">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>User Email</th>
                            <th>Ticket Title</th>
                            <th>Qty</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((b, index) => (
                            <tr key={b._id}>
                                <td>{index + 1}</td>
                                <td>{b.userEmail}</td>
                                <td>{b.title}</td>
                                <td>{b.quantity}</td>
                                <td>{b.totalPrice} Tk</td>
                                <td>
                                    <span className={`badge ${b.status.toLowerCase() === "pending" ? "badge-info" : b.status.toLowerCase() === "accepted" ? "badge-success" : "badge-error"}`}>
                                        {b.status}
                                    </span>
                                </td>
                                <td className="flex flex-wrap gap-2">
                                    <button
                                        disabled={b.status.toLowerCase() !== "pending"}
                                        onClick={() => handleAccept(b._id)}
                                        className="btn btn-success btn-sm"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        disabled={b.status.toLowerCase() !== "pending"}
                                        onClick={() => handleReject(b._id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedBookings;
