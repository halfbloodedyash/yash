const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

// Read .env.local manually
const envPath = path.resolve(__dirname, '../.env.local');
let envContent = '';
try {
    envContent = fs.readFileSync(envPath, 'utf8');
} catch (e) {
    console.error('Error: Could not read .env.local file.');
    process.exit(1);
}

const parseEnv = (content) => {
    const config = {};
    const lines = content.split('\n');
    for (const line of lines) {
        const match = line.match(/^([^=:#]+?)[=:](.*)/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^['"](.*)['"]$/, '$1');
            config[key] = value;
        }
    }
    return config;
};

const config = parseEnv(envContent);
const CLIENT_ID = config.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = config.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:8888/callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('Error: SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET not found in .env.local');
    console.log('Please fill them in first!');
    process.exit(1);
}

const SCOPES = 'user-read-currently-playing user-read-recently-played';

// Create server to handle callback
const server = http.createServer(async (req, res) => {
    if (req.url.startsWith('/callback')) {
        const urlParams = new URL(req.url, `http://${req.headers.host}`).searchParams;
        const code = urlParams.get('code');

        if (code) {
            res.end('Got the code! You can close this window and check your terminal.');
            server.close();

            console.log('\nExchanging code for token...');

            const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
            const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${basic}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: REDIRECT_URI,
                }),
            });

            const data = await tokenResponse.json();

            if (data.refresh_token) {
                console.log('\nSUCCESS! Here is your Refresh Token:');
                console.log('---------------------------------------------------');
                console.log(data.refresh_token);
                console.log('---------------------------------------------------');
                console.log('\nI will attempt to append this to your .env.local file now...');

                try {
                    fs.appendFileSync(envPath, `\nSPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
                    console.log('Successfully updated .env.local!');
                    console.log('Now restart your dev server: npm run dev');
                } catch (err) {
                    console.error('Could not write to .env.local. Please manually add it.');
                }

            } else {
                console.error('Error getting token:', data);
            }
            process.exit(0);
        }
    }
});

server.listen(8888, () => {
    const authUrl = `https://accounts.spotify.com/authorize?` + querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPES,
        redirect_uri: REDIRECT_URI,
    });

    console.log('\n1. Ensure you have added "http://127.0.0.1:8888/callback" as a Redirect URI in your Spotify Dashboard.');
    console.log('2. Open the following URL in your browser to authorize:');
    console.log('\n' + authUrl + '\n');
    console.log('Waiting for callback...');
});
