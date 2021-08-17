import { Response } from 'express';

export class ResponseHandler {
    static handleSuccess(res: Response, { code = 200, message = '', data = {} || [], pagination = null }) {
        const result = {
            status: 'SUCCESS',
            data,
            message,
            pagination
        };

        res.status(code).json(result);
    }

    static handleError(res: Response, { code = 406, message = '' }) {
        res.status(code).json({
            status: 'ERROR',
            message
        })
    }
}