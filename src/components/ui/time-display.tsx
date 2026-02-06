"use client";

import { useEffect, useState } from "react";

export const TimeDisplay = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Kolkata",
                })
            );
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    if (!time) {
        return <span className="opacity-0">00:00 IST</span>; // Prevent layout shift
    }

    return (
        <span>
            {time} IST
        </span>
    );
};
