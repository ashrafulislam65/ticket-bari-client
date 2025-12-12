import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {
    const {ticketId} = useParams();
    const axiosSecure = useAxiosSecure();
    const {isLoading,data: ticket} = useQuery({
        queryKey: ['ticketPayment', ticketId],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/bookings/${ticketId}`);
            return res.data;

        }
    });
    const handlePayment = async() => {
        const paymentInfo = {
            totalPrice: ticket.totalPrice,
            ticketId: ticket._id,
            userEmail: ticket.userEmail,
            ticketTitle: ticket.title
            
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url;

    }
    if(isLoading ){
        return <span className="loading loading-bars loading-xl"></span>;
    }
    return (
        <div>
            <h2>Please Pay ${ticket.totalPrice} for : {ticket.title}</h2>
            <button onClick={handlePayment} className='btn btn-neutral'>Pay</button>
            
        </div>
    );
};

export default Payment;