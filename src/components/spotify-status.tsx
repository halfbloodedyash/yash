"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import Link from "next/link";

type SpotifyData = {
    status: "playing" | "last_played" | "offline" | "error";
    title: string | null;
    url: string | null;
};

export function SpotifyStatus({ className }: { className?: string }) {
    const [data, setData] = useState<SpotifyData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/spotify");
                const json = await res.json();
                if (json.status !== "offline" && json.status !== "error") {
                    setData(json);
                }
            } catch (error) {
                console.error("Error fetching spotify status:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // Refresh every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading || !data || !data.title) {
        return null;
    }

    return (
        <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
            {data.status === "playing" ? (
                <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
            ) : (
                <span className="h-2 w-2 mr-1 rounded-full bg-muted-foreground/30"></span>
            )}
            <span>
                {data.status === "playing" ? "Now playing: " : "Last played: "}
                {data.url ? (
                    <Link
                        href={data.url}
                        target="_blank"
                        className="font-medium text-foreground hover:underline"
                    >
                        {data.title}
                    </Link>
                ) : (
                    <span className="font-medium text-foreground">{data.title}</span>
                )}
            </span>
        </div>
    );
}
