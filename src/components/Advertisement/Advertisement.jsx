import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const Advertisement = () => {
  const axiosSecure = useAxiosSecure();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/advertised-tickets")
      .then(res => {
        setTickets(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!tickets.length) return null;

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">🔥 Featured Advertisements</h2>
          <p className="text-gray-500 mt-2">
            Top approved tickets promoted by our platform
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card bg-base-100 shadow-xl rounded-2xl"
            >
              <figure className="relative">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="h-44 w-full object-cover"
                />
                <span className="badge badge-error absolute top-3 left-3">
                  AD
                </span>
              </figure>

              <div className="card-body">
                <h3 className="card-title text-lg">{ticket.title}</h3>
                <p className="text-sm text-gray-500">
                  {ticket.from} → {ticket.to}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <p className="font-semibold text-primary">
                    $ {ticket.price}
                  </p>
                  <p className="text-xs text-gray-400">
                    {ticket.departureDate} | {ticket.departureTime}
                  </p>
                </div>

                <div className="card-actions mt-4">
                  <Link to={`/ticket/${ticket._id}`}>
                    <button className="btn btn-neutral btn-sm w-full">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advertisement;
