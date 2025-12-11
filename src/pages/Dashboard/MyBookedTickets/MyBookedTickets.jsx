import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyBookedTickets = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: tickets = [] } = useQuery({
        queryKey:['myBookedTickets',user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/bookings?userEmail=${user?.email}`);
            console.log('My Booked Tickets:', res.data);
            return res.data;
        }
    })
    return (
        <div>
            <h2 className='text-3xl font-bold text-center'>My Booked Tickets : {tickets.length}  </h2>
            
        </div>
    );
};

export default MyBookedTickets;