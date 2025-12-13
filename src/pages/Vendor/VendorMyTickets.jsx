import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const VendorMyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/vendor/tickets").then(res => {
      setTickets(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickets.map(ticket => (
        <div key={ticket._id} className="card bg-base-100 shadow">
          <img src={ticket.image} className="h-40 w-full object-cover" />

          <div className="card-body">
            <h2 className="card-title">{ticket.title}</h2>

            <p>Status:
              <span className={`ml-2 badge ${
                ticket.verificationStatus === "approved"
                  ? "badge-success"
                  : ticket.verificationStatus === "rejected"
                  ? "badge-error"
                  : "badge-warning"
              }`}>
                {ticket.verificationStatus}
              </span>
            </p>

            <button
              className="btn btn-sm btn-info"
              disabled={ticket.verificationStatus === "rejected"}
            >
              Update
            </button>

            <button
              className="btn btn-sm btn-error"
              disabled={ticket.verificationStatus === "rejected"}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VendorMyTickets;
