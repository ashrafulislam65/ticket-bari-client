import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Load all users (Admin only)
    const { data: users = [], isLoading: loadingUsers } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data.data;
        }
    });

    // Load pending vendor requests
    const { data: pendingVendors = [], isLoading: loadingVendors } = useQuery({
        queryKey: ["pendingVendors"],
        queryFn: async () => {
            const res = await axiosSecure.get("/vendor-request");
            return res.data.data;
        }
    });

    // Change Role
    const handleRoleChange = async (id, newRole) => {
        const confirm = await Swal.fire({
            title: `Make this user ${newRole}?`,
            icon: "warning",
            showCancelButton: true
        });

        if (!confirm.isConfirmed) return;

        await axiosSecure.patch(`/users/role/${id}`, { role: newRole });

        Swal.fire("Success", "Role updated successfully", "success");

        // Update users locally
        queryClient.setQueryData(["allUsers"], (old = []) =>
            old.map(u => (u._id === id ? { ...u, role: newRole } : u))
        );
    };

    // Mark Vendor as FRAUD
    const markAsFraud = async (email) => {
        const confirm = await Swal.fire({
            title: "Mark as Fraud?",
            text: "This vendor will lose all access.",
            icon: "warning",
            showCancelButton: true
        });

        if (!confirm.isConfirmed) return;

        await axiosSecure.patch(`/users/mark-fraud/${email}`);

        Swal.fire("Marked as Fraud", "Vendor disabled", "error");

        // Remove vendor from users & pending vendors locally
        queryClient.setQueryData(["allUsers"], (old = []) =>
            old.map(u => (u.email === email ? { ...u, role: "fraud" } : u))
        );
        queryClient.setQueryData(["pendingVendors"], (old = []) =>
            old.filter(v => v.email !== email)
        );
    };

    // Approve Vendor Request
    const approveVendor = async (request) => {
        const confirm = await Swal.fire({
            title: "Approve Vendor?",
            text: `Approve ${request.name}?`,
            icon: "question",
            showCancelButton: true
        });

        if (!confirm.isConfirmed) return;

        await axiosSecure.patch(`/users/make-vendor/${request.email}`);
        await axiosSecure.patch(`/vendor-request/approve/${request._id}`);

        Swal.fire("Approved", "Vendor request approved", "success");

        queryClient.setQueryData(["allUsers"], (old = []) => [
            ...old,
            { ...request, role: "vendor" }
        ]);
        queryClient.setQueryData(["pendingVendors"], (old = []) =>
            old.filter(v => v._id !== request._id)
        );
    };

    // Reject Vendor Request
    const rejectVendor = async (id) => {
        const confirm = await Swal.fire({
            title: "Reject Vendor Request?",
            icon: "warning",
            showCancelButton: true
        });

        if (!confirm.isConfirmed) return;

        await axiosSecure.patch(`/vendor-request/reject/${id}`);

        Swal.fire("Rejected", "Vendor request rejected", "info");

        queryClient.setQueryData(["pendingVendors"], (old = []) =>
            old.filter(v => v._id !== id)
        );
    };

    if (loadingUsers || loadingVendors)
        return <p className="text-center p-10">Loading...</p>;

    return (
        <div className="p-6 space-y-14">
            <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

            {/* ---------- USERS TABLE ---------- */}
            <div className="overflow-x-auto border rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 p-4 bg-gray-100 rounded-t-lg">
                    All Users ({users.length})
                </h2>
                <table className="table w-full min-w-[600px]">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, i) => (
                            <tr key={u._id}>
                                <td>{i + 1}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <span
                                        className={`px-3 py-1 rounded text-white ${
                                            u.role === "admin"
                                                ? "bg-purple-600"
                                                : u.role === "vendor"
                                                ? "bg-green-600"
                                                : u.role === "fraud"
                                                ? "bg-red-700"
                                                : "bg-blue-600"
                                        }`}
                                    >
                                        {u.role}
                                    </span>
                                </td>
                                <td className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleRoleChange(u._id, "admin")}
                                        className="btn btn-xs btn-warning"
                                    >
                                        Make Admin
                                    </button>
                                    <button
                                        onClick={() => handleRoleChange(u._id, "vendor")}
                                        className="btn btn-xs btn-success"
                                    >
                                        Make Vendor
                                    </button>
                                    <button
                                        onClick={() => handleRoleChange(u._id, "user")}
                                        className="btn btn-xs btn-info"
                                    >
                                        Make User
                                    </button>
                                    {u.role === "vendor" && (
                                        <button
                                            onClick={() => markAsFraud(u.email)}
                                            className="btn btn-xs btn-error"
                                        >
                                            Mark Fraud
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ---------- PENDING VENDORS ---------- */}
            <div className="overflow-x-auto border rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 p-4 bg-gray-100 rounded-t-lg">
                    Pending Vendor Requests ({pendingVendors.length})
                </h2>
                <table className="table w-full min-w-[600px]">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Business</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingVendors.map((v, i) => (
                            <tr key={v._id}>
                                <td>{i + 1}</td>
                                <td>{v.name}</td>
                                <td>{v.email}</td>
                                <td>{v.businessName}</td>
                                <td className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => approveVendor(v)}
                                        className="btn btn-xs btn-success"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => rejectVendor(v._id)}
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
        </div>
    );
};

export default ManageUsers;
