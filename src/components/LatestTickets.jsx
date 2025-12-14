import { Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const LatestTickets = () => {
  const [tickets, setTickets] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/tickets/latest")
      .then(res => setTickets(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure]);

  return (
    <div className="my-14 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Latest Tickets
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map(ticket => (
          <div
            key={ticket._id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition flex flex-col overflow-hidden h-[380px]"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={ticket.image}
                alt={ticket.title}
                className="h-40 w-full object-cover"
              />
              <span className="absolute top-3 right-3 bg-neutral text-white px-3 py-1 rounded-full text-xs font-semibold">
                ${ticket.price}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-semibold mb-1">
                {ticket.title}
              </h3>

              {/* Transport + Route */}
              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p>
                  <span className="font-medium text-gray-800">Transport:</span>{" "}
                  {ticket.transport}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Route:</span>{" "}
                  {ticket.from} → {ticket.to}
                </p>
              </div>

              {/* Available + Date (2 column + vertical line) */}
              <div className="flex items-start text-sm mb-3">
                <span className="text-green-600 font-semibold">
                  Available: {ticket.quantity} seats
                </span>

                {/* vertical divider */}
                <span className="mx-3 h-4 w-px bg-gray-300 mt-1"></span>

                <span className="text-gray-500">
                  {ticket.departureDate || "2025-12-16"}
                </span>
              </div>

              {/* Perks */}
              {ticket.perks?.length > 0 && (
                <div className="flex flex-wrap gap-2 ">
                  {ticket.perks.slice(0, 3).map((perk, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              )}

              {/* Button (no extra gap) */}
              <Link to={`/ticket/${ticket._id}`} className="mt-2">
                <button className="btn btn-neutral btn-sm w-full">
                  See Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestTickets;
