import SpotifyWebApi from "spotify-web-api-node";

const spotifyAPI = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_KEY,
    clientSecret: process.env.SPOTIFY_SECRET_KEY
});

export class SpotifyClient {
    static async getToken(): Promise<void> {
        try {
            const res = await spotifyAPI.clientCredentialsGrant();
            const token = res.body['access_token'];
            spotifyAPI.setAccessToken(token);
        } catch (err) {
            return err;
        }
    }

    static async findTracks(isrc: string) {
        try {
            const results = await spotifyAPI.searchTracks(`isrc:${isrc}`);

            const { album, name, artists, external_ids } = this.getPopularTrack(results.body?.tracks?.items);

            return { album, name, artists, external_ids };
        } catch (err) {
            console.log('Search Tracks in Spotify Error: ', err);
            return err;
        }
    }

    static async getISRCs(title: string) {
        try {
            const results = await spotifyAPI.searchTracks(title);


            const { album, name, artists, external_ids } = this.getPopularTrack(results.body?.tracks?.items);

            const trackData = {
                isrc: external_ids.isrc,
                artist: artists.map((artist: { name: string; }) => artist.name),
                title: name,
                image_uri: album.images[0].url
            };
            
            return trackData;
        } catch (err) {
            console.log('Search Tracks in Spotify Error: ', err);
            return err;
        }
    }

    private static getPopularTrack(trackArr: any[] | undefined) {
        // needed to add undefined so that typescript could stop complaining about object possibly being undefined(linting error)
        if (trackArr === undefined) return;
        if (trackArr.length === 1) return trackArr[0];

        trackArr.sort((a, b) => b.popularity - a.popularity);
        return trackArr[0];
    }
}

const initialize = async () => {
    try {
        await SpotifyClient.getToken();
        console.log('Connected to Spotify!');
    } catch (err) {
        console.log('Error getting Spotify Authentication: ', err);
    }
}

initialize();