"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import Link from "next/link";

type SpotifyData = {
    status: "playing" | "last_played" | "offline" | "error";
    title: string | null;
    url: string | null;
};

// Animated playing bars component
function PlayingBars() {
    return (
        <span className="flex items-end gap-[2px] h-3">
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="w-[3px] bg-green-500 rounded-sm animate-pulse"
                    style={{
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: "0.5s",
                        height: "100%",
                        animation: `spotify-bar 0.5s ease-in-out ${i * 0.15}s infinite alternate`,
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes spotify-bar {
                    0% { height: 30%; }
                    100% { height: 100%; }
                }
            `}</style>
        </span>
    );
}

export function SpotifyStatus({ className }: { className?: string }) {
    const [data, setData] = useState<SpotifyData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/spotify");
                if (!res.ok) {
                    throw new Error(`Failed to fetch status: ${res.status}`);
                }
                const json = await res.json();
                // Always update data if we have a valid title
                if (json.title) {
                    setData(json);
                }
            } catch {
                // Silently fail - component persists last known state
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

    const isPlaying = data.status === "playing";

    return (
        <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
            {isPlaying && <PlayingBars />}
            <span>
                <span className={isPlaying ? "text-green-500" : ""}>
                    {isPlaying ? "Now playing: " : "Last played: "}
                </span>
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
