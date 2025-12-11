import React, { useEffect, useState } from "react";



import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useParams } from "react-router";

const TicketDetails = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [timeLeft, setTimeLeft] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const axiosSecure = useAxiosSecure();

    // Fetch ticket details
    useEffect(() => {
        axiosSecure
            .get(`/tickets/${id}`)
            .then((res) => {
                console.log("Single Ticket API:", res.data);
                setTicket(res.data.data); // FIXED
            })
            .catch((err) => console.error(err));
    }, [axiosSecure, id]); // FIXED dependencies

    // Countdown Timer
    useEffect(() => {
        if (!ticket) return;

        const interval = setInterval(() => {
            const target = new Date(`${ticket.departureDate} ${ticket.departureTime}`);
            const now = new Date();
            const diff = target - now;

            if (diff <= 0) {
                setTimeLeft("Departure time passed");
                clearInterval(interval);
                return;
            }

            const hrs = Math.floor(diff / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            setTimeLeft(`${hrs}h ${mins}m remaining`);
        }, 1000);

        return () => clearInterval(interval);
    }, [ticket]);

    if (!ticket) return <p>Loading...</p>;

    const departurePassed = timeLeft === "Departure time passed";
    const noTicketsLeft = ticket.quantity <= 0;

    // Handle booking submit
    const handleBooking = async () => {
        if (quantity < 1)
            return Swal.fire("Invalid Quantity", "Please enter a valid number.", "warning");

        if (quantity > ticket.quantity)
            return Swal.fire("Not Enough Tickets", "Reduce quantity and try again.", "error");

        try {
            await axiosSecure.post("/bookings", {
                ticketId: ticket._id,
                quantity,
                status: "Pending",
            });

            Swal.fire("Success!", "Your ticket has been booked!", "success");
            setOpenModal(false);
        } catch (err) {
            Swal.fire("Error", "Booking failed. Try again later.", "error");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 p-6 flex justify-center">
            <div className="card bg-base-100 shadow-xl p-6 w-full max-w-2xl">

                <img src={ticket.image} className="rounded-lg mb-4" alt="ticket" />

                <h2 className="text-3xl font-bold">{ticket.title}</h2>

                <p className="text-gray-600 mt-2">
                    📍 {ticket.from} → {ticket.to}
                </p>

                <p className="mt-2">🚖 Transport: <b>{ticket.transportType}</b></p>

                <p>💰 Price: <b>{ticket.price} Tk</b></p>
                <p>🎟 Available Tickets: <b>{ticket.quantity}</b></p>

                <p className="text-primary font-bold text-xl mt-4">
                    ⏳ {timeLeft}
                </p>

                <button
                    className="btn btn-primary w-full mt-6"
                    onClick={() => setOpenModal(true)}
                    disabled={departurePassed || noTicketsLeft}
                >
                    Book Now
                </button>

                {/* Modal */}
                {openModal && (
                    <div className="modal modal-open bg-black/50">
                        <div className="modal-box">

                            <h3 className="text-xl font-bold mb-3">Book Ticket</h3>

                            <label className="label">
                                <span className="label-text">Enter Quantity</span>
                            </label>

                            <input
                                type="number"
                                min="1"
                                max={ticket.quantity}
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="input input-bordered w-full"
                            />

                            <p className="mt-2 text-sm text-gray-500">
                                Available: {ticket.quantity}
                            </p>

                            <div className="modal-action">
                                <button className="btn btn-primary" onClick={handleBooking}>
                                    Confirm Booking
                                </button>
                                <button className="btn" onClick={() => setOpenModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default TicketDetails;
