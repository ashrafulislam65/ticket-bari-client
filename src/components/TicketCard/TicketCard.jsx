import React from "react";
import useCountdown from "../../hooks/useCountDown";

const TicketCard = ({ ticket }) => {
    const {
        title,
        image,
        quantity,
        totalPrice,
        from,
        to,
        departureTime,
        departureDate,
        status,
        price,
        bookedAt
    } = ticket;

    let departureDateTime;

    // CASE 1: Has both date and time
    if (departureDate && departureTime) {
        departureDateTime = new Date(`${departureDate}T${departureTime}:00`);
    }
    // CASE 2: Has only time → fallback based on bookedAt date
    else if (!departureDate && departureTime) {
        const base = new Date(bookedAt);
        const [h, m] = departureTime.split(":");
        base.setHours(Number(h), Number(m), 0, 0);
        departureDateTime = base;
    }
    // CASE 3: Missing everything → invalid
    else {
        departureDateTime = new Date(""); // invalid date
    }

    // Validate date
    const isValid = !isNaN(departureDateTime.getTime());

    // ⚠️ Hook must be OUTSIDE condition → We protect by passing a safe value
    const countdown = useCountdown(isValid ? departureDateTime.toISOString() : null);

    const isExpired = countdown === "Expired";

    const handlePayment = () => {
        console.log("Paying for:", ticket);
    };

    return (
        <div className="card bg-base-100 shadow-xl border">
            <figure>
                <img src={image} alt={title} className="h-40 w-full object-cover" />
            </figure>

            <div className="card-body">
                <h2 className="card-title">{title}</h2>

                <p><strong>From:</strong> {from}</p>
                <p><strong>To:</strong> {to}</p>

                <p><strong>Unit Price:</strong> {price} Tk</p>
                <p><strong>Booked Quantity:</strong> {quantity}</p>
                <p><strong>Total Price:</strong> {totalPrice} Tk</p>

                <p>
                    <strong>Departure:</strong>{" "}
                    {isValid ? departureDateTime.toLocaleString() : "Invalid Date"}
                </p>

                <p>
                    <strong>Status:</strong>
                    <span
                        className={`ml-2 px-2 py-1 rounded text-white ${
                            status === "pending"
                                ? "bg-yellow-600"
                                : status === "accepted"
                                ? "bg-green-600"
                                : status === "paid"
                                ? "bg-blue-600"
                                : "bg-red-600"
                        }`}
                    >
                        {status}
                    </span>
                </p>

                {/* Countdown */}
                {status !== "rejected" && (
                    <p className="text-sm text-orange-600 font-semibold">
                        Countdown: {countdown}
                    </p>
                )}

                {/* Pay button only if not expired */}
                {status === "accepted" && !isExpired && isValid && (
                    <button
                        className="btn btn-primary mt-3 w-full"
                        onClick={handlePayment}
                    >
                        Pay Now
                    </button>
                )}

                {/* Expired */}
                {isExpired && (
                    <p className="text-red-500 font-semibold mt-2">
                        Cannot pay, event expired
                    </p>
                )}
            </div>
        </div>
    );
};

export default TicketCard;
