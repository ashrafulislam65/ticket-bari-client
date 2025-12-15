import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminManageTickets = () => {
    const [tickets, setTickets] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get("/admin/tickets").then(res => setTickets(res.data));
    }, [axiosSecure]);

    const handleApprove = id => {
        axiosSecure.patch(`/tickets/approve/${id}`).then(() => {
            setTickets(prev =>
                prev.map(t =>
                    t._id === id ? { ...t, verificationStatus: "approved" } : t
                )
            );
        });
    };

    const handleReject = id => {
        axiosSecure.patch(`/tickets/reject/${id}`).then(() => {
            setTickets(prev =>
                prev.map(t =>
                    t._id === id ? { ...t, verificationStatus: "rejected" } : t
                )
            );
        });
    };

    return (
        <div className="overflow-x-auto border rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Tickets ({tickets.length})</h2>
            <table className="table w-full min-w-[600px]">
                <thead className="bg-gray-200">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Vendor</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={ticket._id}>
                            <td>{index + 1}</td>
                            <td>{ticket.title}</td>
                            <td>{ticket.vendorEmail}</td>
                            <td>
                                <span
                                    className={`px-3 py-1 rounded text-white ${
                                        ticket.verificationStatus === "approved"
                                            ? "bg-green-600"
                                            : ticket.verificationStatus === "rejected"
                                            ? "bg-red-600"
                                            : "bg-yellow-500"
                                    }`}
                                >
                                    {ticket.verificationStatus}
                                </span>
                            </td>
                            <td className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => handleApprove(ticket._id)}
                                    disabled={ticket.verificationStatus !== "pending"}
                                    className="btn btn-xs btn-success"
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={() => handleReject(ticket._id)}
                                    disabled={ticket.verificationStatus !== "pending"}
                                    className="btn btn-xs btn-error"
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminManageTickets;
