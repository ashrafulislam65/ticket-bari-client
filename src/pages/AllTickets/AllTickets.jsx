import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const ITEMS_PER_PAGE = 6;

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();

  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  // filters
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [transport, setTransport] = useState("");
  const [sort, setSort] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  // fetch tickets
  useEffect(() => {
    axiosSecure
      .get("/tickets")
      .then(res => {
        setTickets(res.data.data);
        setFilteredTickets(res.data.data);
      })
      .catch(err => console.error(err));
  }, []);

  // apply filters
  useEffect(() => {
    let data = [...tickets];

    if (from) {
      data = data.filter(t =>
        t.from.toLowerCase().includes(from.toLowerCase())
      );
    }

    if (to) {
      data = data.filter(t =>
        t.to.toLowerCase().includes(to.toLowerCase())
      );
    }

    if (transport) {
      data = data.filter(t => t.transport === transport);
    }

    if (sort === "low") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    setFilteredTickets(data);
    setCurrentPage(1);
  }, [from, to, transport, sort, tickets]);

  // pagination logic
  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTickets = filteredTickets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // reset filters
  const resetFilters = () => {
    setFrom("");
    setTo("");
    setTransport("");
    setSort("");
  };

  return (
    <div className="min-h-screen lg:px-30 bg-base-200 p-6">
      <h2 className="text-3xl font-bold mb-6">🎫 All Tickets</h2>

      {/* 🔎 SEARCH & FILTER */}
      <div className="bg-white p-4 rounded-xl shadow mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="From (Dhaka)"
          className="input input-bordered w-full"
          value={from}
          onChange={e => setFrom(e.target.value)}
        />

        <input
          type="text"
          placeholder="To (Chittagong)"
          className="input input-bordered w-full"
          value={to}
          onChange={e => setTo(e.target.value)}
        />

        <select
          className="select select-bordered w-full"
          value={transport}
          onChange={e => setTransport(e.target.value)}
        >
          <option value="">All Transport</option>
          <option value="Bus">Bus</option>
          <option value="Plane">Plane</option>
          <option value="Train">Train</option>
        </select>

        <select
          className="select select-bordered w-full"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      {/* 🎫 TICKETS OR EMPTY STATE */}
      {paginatedTickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
          <div className="text-7xl mb-4 animate-bounce">🎫</div>

          <h3 className="text-2xl font-bold mb-2">
            No tickets found
          </h3>

          <p className="text-gray-500 max-w-md mb-6">
            No tickets match your search or filters.
            Try changing location, transport type or sorting.
          </p>

          <button
            onClick={resetFilters}
            className="btn btn-outline btn-primary"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTickets.map(ticket => (
            <div key={ticket._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="h-48 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h3 className="text-xl font-bold">{ticket.title}</h3>

                <p className="font-medium text-gray-600">
                  📍 {ticket.from} → {ticket.to}
                </p>

                <p>🚖 Transport: <b>{ticket.transport}</b></p>
                <p>💰 Price: <b>{ticket.price} Tk</b></p>
                <p>🎟 Available: <b>{ticket.quantity}</b></p>
                <p>
                  ⏰ Departure:{" "}
                  <b>{ticket.departureDate} — {ticket.departureTime}</b>
                </p>

                <div className="card-actions justify-end mt-3">
                  <Link to={`/ticket/${ticket._id}`} className="btn btn-neutral">
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📄 PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          <button
            className="btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map(i => (
            <button
              key={i}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-neutral" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllTickets;
