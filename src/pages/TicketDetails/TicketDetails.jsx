
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Fetch ticket
  useEffect(() => {
    axiosSecure.get(`/tickets/${id}`).then(res => {
      setTicket(res.data.data);
    });
  }, [id, axiosSecure]);

  // Countdown
  useEffect(() => {
    if (!ticket) return;

    const interval = setInterval(() => {
      const target = new Date(
        `${ticket.departureDate}T${ticket.departureTime}:00`
      );
      const diff = target - new Date();

      if (diff <= 0) {
        setTimeLeft("Departure time passed");
        clearInterval(interval);
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${h}h ${m}m remaining`);
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket]);

  if (!ticket) return <p className="text-center mt-10">Loading...</p>;

  const handleBooking = async () => {
    try {
      await axiosSecure.post("/bookings", {
        ticketId: ticket._id,
        quantity,
        userEmail: user?.email,
      });

      Swal.fire({
        icon: "success",
        title: "Booking Successful!",
        text: "What do you want to do next?",
        showCancelButton: true,
        confirmButtonText: "Go Home",
        cancelButtonText: "Continue Booking",
      }).then(result => {
        if (result.isConfirmed) navigate("/");
        else setOpenModal(false);
      });

    } catch {
      Swal.fire("Error", "Booking failed", "error");
    }
  };

  return (
    <div className="bg-base-200 min-h-screen p-6">
      <button
        className="btn btn-sm mb-4"
        onClick={() => navigate("/")}
      >
        ⬅ Back to Home
      </button>

      {/* Main Card */}
      <div className="bg-base-100 rounded-xl shadow-lg p-6 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

        {/* Image */}
        <img
          src={ticket.image || "https://i.ibb.co/4g3ZQ8Q/bus-placeholder.jpg"}
          onError={(e) =>
            (e.target.src = "https://i.ibb.co/4g3ZQ8Q/bus-placeholder.jpg")
          }
          className="w-full h-60 object-cover rounded-lg"
          alt="ticket"
        />

        {/* Info */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{ticket.title}</h2>
          <p>📍 {ticket.from} → {ticket.to}</p>
          <p>🚖 Transport: <b>{ticket.transport}</b></p>
          <p>🗓 {ticket.departureDate} at {ticket.departureTime}</p>
          <p>💰 Price: <b>${ticket.price}</b></p>
          <p>🎟 Available: <b>{ticket.quantity}</b></p>

          <p className="text-primary font-semibold mt-2">⏳ {timeLeft}</p>

          <button
            className="btn btn-primary w-full mt-4"
            onClick={() => setOpenModal(true)}
            disabled={ticket.quantity <= 0 || timeLeft === "Departure time passed"}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Relevant Section */}
      <div className="max-w-5xl mx-auto mt-10">
        <h3 className="text-xl font-bold mb-4">✨ You may also like</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="p-4 bg-base-100 rounded shadow">
              <p className="font-semibold">Popular Route</p>
              <p className="text-sm text-gray-500">Best selling ticket</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold mb-2">Confirm Booking</h3>
            <input
              type="number"
              min="1"
              max={ticket.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="input input-bordered w-full"
            />
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleBooking}>
                Confirm
              </button>
              <button className="btn" onClick={() => setOpenModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
