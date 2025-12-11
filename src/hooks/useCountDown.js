import { useEffect, useState } from "react";

export default function useCountdown(targetDate) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const parsed = new Date(targetDate);

        // ❌ If invalid → DO NOT setState immediately inside effect
        // ✔ Instead schedule it in next tick using setTimeout(0)
        if (!targetDate || isNaN(parsed.getTime())) {
            setTimeout(() => {
                setTimeLeft("Invalid Date");
            }, 0);
            return;
        }

        const timer = setInterval(() => {
            const now = new Date();
            const diff = parsed - now;

            if (diff <= 0) {
                setTimeLeft("Expired");
                clearInterval(timer);
                return;
            }

            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${h}h ${m}m ${s}s`);
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return timeLeft;
}
