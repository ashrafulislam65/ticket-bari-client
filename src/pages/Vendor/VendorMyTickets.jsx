import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const VendorMyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/vendor/tickets").then(res => {
      setTickets(res.data);
    });
  }, [axiosSecure]);

  // Open modal with ticket data
  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedTicket(null);
    setModalOpen(false);
  };

  // Handle ticket update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    const updatedData = {
      price: parseFloat(e.target.price.value),
      quantity: parseInt(e.target.quantity.value),
      departureDate: e.target.departureDate.value,
      departureTime: e.target.departureTime.value,
    };

    try {
      const res = await axiosSecure.patch(
        `/vendor/tickets/${selectedTicket._id}`,
        updatedData
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Ticket updated. Waiting for admin approval",
          timer: 2000,
          showConfirmButton: false
        });

        setTickets(prev =>
          prev.map(ticket =>
            ticket._id === selectedTicket._id
              ? { ...ticket, ...updatedData, verificationStatus: "pending" }
              : ticket
          )
        );

        closeModal();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || "Something went wrong"
      });
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This ticket will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/vendor/tickets/${id}`);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Ticket has been deleted",
          timer: 2000,
          showConfirmButton: false
        });

        setTickets(prev =>
          prev.filter(ticket => ticket._id !== id)
        );
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.response?.data?.message || "Something went wrong"
      });
    }
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map(ticket => (
          <div key={ticket._id} className="card bg-base-100 shadow">
            <img
              src={ticket.image}
              alt={ticket.title}
              className="h-40 w-full object-cover"
            />
            <div className="card-body">
              <h2 className="card-title">{ticket.title}</h2>
              <p>
                Status:
                <span
                  className={`ml-2 badge ${
                    ticket.verificationStatus === "approved"
                      ? "badge-success"
                      : ticket.verificationStatus === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {ticket.verificationStatus}
                </span>
              </p>
              <div className="flex gap-2">
                <button
                  className="btn btn-sm btn-info"
                  disabled={ticket.verificationStatus === "rejected"}
                  onClick={() => openModal(ticket)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-error"
                  disabled={ticket.verificationStatus === "rejected"}
                  onClick={() => handleDelete(ticket._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h2 className="text-xl font-bold mb-4">Update Ticket</h2>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <input
                type="number"
                name="price"
                defaultValue={selectedTicket.price}
                placeholder="Price"
                className="input input-bordered w-full"
                required
              />
              <input
                type="number"
                name="quantity"
                defaultValue={selectedTicket.quantity}
                placeholder="Quantity"
                className="input input-bordered w-full"
                required
              />
              <input
                type="date"
                name="departureDate"
                defaultValue={selectedTicket.departureDate}
                className="input input-bordered w-full"
                required
              />
              <input
                type="time"
                name="departureTime"
                defaultValue={selectedTicket.departureTime}
                className="input input-bordered w-full"
                required
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-sm btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-success">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorMyTickets;
