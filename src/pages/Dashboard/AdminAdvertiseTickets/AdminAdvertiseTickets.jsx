import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminAdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/approved-tickets").then(res => {
      setTickets(res.data);
    });
  }, [axiosSecure]);

  const handleToggle = async (ticket) => {
    try {
      const res = await axiosSecure.patch(
        `/admin/tickets/advertise/${ticket._id}`,
        { advertise: !ticket.isAdvertised }
      );

      if (res.data.success) {
        setTickets(prev =>
          prev.map(t =>
            t._id === ticket._id
              ? { ...t, isAdvertised: !ticket.isAdvertised }
              : t
          )
        );

        Swal.fire({
          icon: "success",
          title: res.data.message,
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Action failed",
        text: err.response?.data?.message || "Something went wrong"
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Title</th>
            <th>Route</th>
            <th>Price</th>
            <th>Advertise</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket,index) => (
            <tr key={ticket._id}>
              <td>{index+1}</td>
              <td>{ticket.title}</td>
              <td>{ticket.from} → {ticket.to}</td>
              <td>${ticket.price}</td>
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={ticket.isAdvertised || false}
                  onChange={() => handleToggle(ticket)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAdvertiseTickets;
