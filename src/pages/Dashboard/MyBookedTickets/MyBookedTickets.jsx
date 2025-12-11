import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import TicketCard from '../../../components/TicketCard/TicketCard';

const MyBookedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: tickets = [] } = useQuery({
        queryKey: ['myBookedTickets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?userEmail=${user?.email}`);
            console.log('My Booked Tickets:', res.data);
            return res.data;
        }
    });

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-8">
                My Booked Tickets: {tickets.length}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map(ticket => (
                    <TicketCard key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};

export default MyBookedTickets;
