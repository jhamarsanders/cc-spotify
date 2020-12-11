import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Route not found');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    serializeErrors() {
        return [{ message: 'Not Found' }];
    }
}