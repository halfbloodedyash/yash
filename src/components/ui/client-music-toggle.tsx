"use client";

import dynamic from "next/dynamic";

// Dynamic import with SSR disabled to prevent hydration mismatch from useSound hook
const MusicToggleButton = dynamic(
    () => import("@/components/ui/music-toggle").then((mod) => mod.MusicToggleButton),
    { ssr: false }
);

export function ClientMusicToggle() {
    return (
        <div className="fixed bottom-4 left-4 z-50">
            <MusicToggleButton />
        </div>
    );
}
