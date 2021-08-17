import { SpotifyClient } from '../../helpers/spotifyClient';
import { Track, TrackInterface } from '../../Models/Track';
import { Artist, ArtistInterface } from '../../Models/Artist';

export class TrackService {
    static async findTrack(data: any) {
        try {
            const { isrc, artist } = data;

            let trackRes;

            if (isrc) {
                trackRes = await Track.query().findOne({ isrc })
            } else if (artist) {
                // trackRes = await Track.query().whereRaw(`EXISTS (
                //     SELECT * FROM unnest(artists) AS artist
                //     WHERE lower(artist) LIKE lower('${artist}%')
                //   )`)
                
                  trackRes = await Track
                                    .query()
                                    .select('track.*', 'artist.name as artist_name')
                                    .leftJoin('artist', 'track.artist_id', 'artist.id')
                                    .whereRaw(`lower(artist.name) LIKE lower('${artist}%')`)
            }

            return trackRes;
        } catch (err) {
            console.log('Finding Track Error: ', err);
            return err;
        }
    }

    static async saveTrack(isrc: string): Promise<TrackInterface> {
        try {
            const { album, name, artists } = await SpotifyClient.findTracks(isrc);

            let artist = await Artist.query().findOne({ name: artists[0].name });
            if (!artist) {
                artist = await Artist.query().insert({ name: artists[0].name });
            }

            // I need to refactor this typescript/json linting issue.
            let id: string | number = artist.id.toString();
            id = parseInt(id);

            const trackData = {
                isrc,
                artist_id: id,
                title: name,
                image_uri: album.images[0].url
            };

            const track = await Track.query().insert(trackData);

            return track;
        } catch (err) {
            console.log('Saving Track Error: ', err);
            return err;
        }
    }

    static async getISRC(title: string) {
        try {
            const tracks = await SpotifyClient.getISRCs(title);

            return tracks;
        } catch (err) {
            console.log('Get ISRC error: ', err);
            return err;
        }
    }
}