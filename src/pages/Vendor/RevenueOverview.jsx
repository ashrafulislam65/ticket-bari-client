import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const RevenueOverview = () => {
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await axiosSecure.get("/vendor/revenue-overview");
        // Transform data for Recharts
        setData([
          { name: "Revenue ($)", value: res.data.totalRevenue },
          { name: "Tickets Sold", value: res.data.totalTicketsSold },
          { name: "Tickets Added", value: res.data.totalTicketsAdded },
        ]);
      } catch (err) {
        console.error("Failed to fetch revenue overview:", err);
      }
    };
    fetchRevenue();
  }, [axiosSecure]);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Revenue Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#4ade80" />
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-4">
        Total Revenue: <strong>${data.find(d => d.name === "Revenue ($)")?.value}</strong> | Total Tickets Sold: <strong>{data.find(d => d.name === "Tickets Sold")?.value}</strong> | Total Tickets Added: <strong>{data.find(d => d.name === "Tickets Added")?.value}</strong>
      </p>
    </div>
  );
};

export default RevenueOverview;
