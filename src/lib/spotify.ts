const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

const getAccessToken = async () => {
    // Return cached token if still valid (with 60s buffer)
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry - 60000) {
        return { access_token: cachedToken };
    }

    console.log("Refreshing Spotify Access Token...");
    try {
        const response = await fetch(TOKEN_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: `Basic ${basic}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refresh_token!,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch token: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        cachedToken = data.access_token;
        // Spotify tokens last 3600 seconds (1 hour)
        tokenExpiry = Date.now() + (data.expires_in * 1000);

        return data;
    } catch (error) {
        console.error("Error getting access token:", error);
        throw error;
    }
};

export const getNowPlaying = async () => {
    try {
        const { access_token } = await getAccessToken();

        return fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            // Add next: { revalidate: 0 } if we want to ensure no caching on the data fetch itself
            cache: 'no-store'
        });
    } catch (error) {
        console.error("Error in getNowPlaying:", error);
        throw error;
    }
};

export const getRecentlyPlayed = async () => {
    try {
        const { access_token } = await getAccessToken();

        return fetch(RECENTLY_PLAYED_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            cache: 'no-store'
        });
    } catch (error) {
        console.error("Error in getRecentlyPlayed:", error);
        throw error;
    }
};
