import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
    const [params] = useSearchParams();
    const sessionId = params.get("session_id");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            axiosSecure.post("/payment/success", { sessionId })
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Payment Successful!",
                        text: "Your booking status has been updated.",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Payment Failed",
                        text: "Something went wrong while verifying payment.",
                    });

                });
        }
    }, [sessionId, axiosSecure]);  // 🔥 FIX: missing dependency

    return (
        <div className="text-center mt-20">
            <h2 className="text-4xl font-bold text-green-600">
                Payment Successful 🎉
            </h2>
            <p className="text-xl mt-4">Your booking status has been updated!</p>
        </div>
    );
};

export default PaymentSuccess;
