import request from 'supertest';
import { app } from '../../../app';
import { Track } from '../../../Models/Track';

it('has a route handler listening to /api/track for post requests', async () => {
    const response = await request(app)
        .post('/api/track')
        .send({});

    expect(response.status).not.toEqual(404);
});

it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/track')
        .send({
            isrc: ''
        })
        .expect(406);
    
    await request(app)
        .post('/api/track')
        .send({})
        .expect(406);
});

it('creates a track with valid inputs', async () => {
    const isrc = 'USUM70741299';

    await request(app)
        .post('/api/track')
        .send({ isrc })
        .expect(200);

    const track = await Track.query().findOne({ isrc });
    expect(track.isrc).toEqual(isrc);
    expect(track.title).toEqual('Stronger')

    await Track.query().delete().where({ isrc });
});