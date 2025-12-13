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
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Vendor</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map(ticket => (
                    <tr key={ticket._id}>
                        <td>{ticket.title}</td>
                        <td>{ticket.vendorEmail}</td>
                        <td>{ticket.verificationStatus}</td>
                        <td>
                            <button
                                onClick={() => handleApprove(ticket._id)}
                                disabled={ticket.verificationStatus !== "pending"}
                                className="btn btn-xs btn-success mr-2"
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
    );
};

export default AdminManageTickets;
