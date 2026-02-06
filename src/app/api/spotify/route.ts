import { getNowPlaying, getRecentlyPlayed } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const response = await getNowPlaying();

        if (response.status === 204 || response.status > 400) {
            // Not playing or error, try recently played
            const recentlyPlayed = await getRecentlyPlayed();
            const recentData = await recentlyPlayed.json();

            if (!recentData.items || recentData.items.length === 0) {
                return NextResponse.json({ status: "offline", title: null, url: null });
            }

            const recentTrack = recentData.items[0].track;
            const title = recentTrack.name;
            const url = recentTrack.external_urls.spotify;

            return NextResponse.json({
                status: "last_played",
                title: title,
                url: url,
            });
        }

        const song = await response.json();

        if (song.item === null) {
            return NextResponse.json({ status: "offline", title: null, url: null });
        }

        const isPlaying = song.is_playing;
        const title = song.item.name;
        const url = song.item.external_urls.spotify;

        if (isPlaying) {
            return NextResponse.json({
                status: "playing",
                title: title,
                url: url,
            });
        } else {
            // If paused but returned by currently-playing, it might be better to show as last played or just currently paused.
            // The prompt says "If nothing is playing -> show Last played".
            // A paused song is technically "currently playing" in API terms sometimes but we can treat it as valid "playing" info
            // OR fall through. Let's stick to the prompt: "If a song is currently playing".
            // If is_playing is false, we should probably check recently played to be consistent with "Last played" semantics,
            // or just return this track as "last_played".
            return NextResponse.json({
                status: "last_played",
                title: title,
                url: url,
            });
        }

    } catch (error) {
        console.error("Spotify API Error:", error);
        return NextResponse.json({ status: "error", title: null, url: null }, { status: 500 });
    }
}
