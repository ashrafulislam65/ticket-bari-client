import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TransactionHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Transaction History</h2>

            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Ticket Title</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {payments.map((p,index) => (
                        <tr key={p._id}>
                            <td>{index+1}</td>
                            <td>{p.transactionId}</td>
                            <td>{p.ticketTitle}</td>
                            <td>{p.amount} USD</td>
                            <td>{new Date(p.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
