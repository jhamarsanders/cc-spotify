import express, { Request, Response } from 'express';
import { ResponseHandler } from '../utils/handlers';
import { TrackService } from './track.service';

const router = express.Router();

router.get('/', async(req: Request, res: Response, next) => {
    const { isrc, artist } = req.query;

    if (!isrc && !artist) {
        return ResponseHandler.handleError(res, { message: 'ISRC field or Artist field is required' })
    }

    const track = await TrackService.findTrack(req.query);

    if (track instanceof Error) {
        const err = track;
        return ResponseHandler.handleError(res, err)
    }

    ResponseHandler.handleSuccess(res, { data: track });
});

router.post('/', async (req, res) => {
    const { isrc } = req.body;

    if (!isrc) {
        return ResponseHandler.handleError(res, { message: 'ISRC value is required' })
    }

    const newTrack = await TrackService.saveTrack(isrc);

    if (newTrack instanceof Error) {
        const err = newTrack;
        return ResponseHandler.handleError(res, err);
    }

    ResponseHandler.handleSuccess(res, { message: 'Track saved', data: newTrack });
});

router.get('/isrc', async(req: Request, res: Response, next) => {
    const { title } = req.query;

    if (!title) {
        return ResponseHandler.handleError(res, { message: 'Title field is required' })
    }

    // This is to bypass a typescript error
    if (typeof title !== 'string') {
        return ResponseHandler.handleError(res, { message: 'Invalid Type' })
    }

    const track = await TrackService.getISRC(title);

    if (track instanceof Error) {
        const err = track;
        return ResponseHandler.handleError(res, err)
    }

    ResponseHandler.handleSuccess(res, { data: track });
});

export { router as trackRouter }