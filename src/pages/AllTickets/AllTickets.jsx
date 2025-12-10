import React, { useEffect, useState } from "react";


import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get("/tickets")
            .then(res => {
                console.log("API response:", res.data);
                setTickets(res.data.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-base-200 p-6">
            <h2 className="text-3xl font-bold mb-6">🎫 All Tickets</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {tickets.map(ticket => (
                    <div key={ticket._id} className="card bg-base-100 shadow-xl">
                        <figure>
                            <img src={ticket.image} alt="ticket" className="h-48 w-full object-cover" />
                        </figure>

                        <div className="card-body">

                            <h3 className="text-xl font-bold">{ticket.title}</h3>

                            <p className="font-medium text-gray-600">
                                📍 {ticket.from} → {ticket.to}
                            </p>

                            <p>🚖 Transport: <b>{ticket.
                                transport}</b></p>

                            <p>💰 Price: <b>{ticket.price} Tk</b></p>

                            <p>🎟 Available: <b>{ticket.quantity}</b></p>

                            <p>⭐ Perks: {ticket.perks?.join(", ")}</p>

                            <p>⏰ Departure: <b>{ticket.departureDate} — {ticket.departureTime}</b></p>

                            <div className="card-actions justify-end mt-3">
                                <Link to={`/ticket/${ticket._id}`} className="btn btn-primary">
                                    See Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default AllTickets;
