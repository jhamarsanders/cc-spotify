import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import SwaggerUI from 'swagger-ui-express';
import { NotFoundError } from './errors/index';
import { errorHandler } from './middlewares/error-handler';
import * as dotenv from 'dotenv';
dotenv.config();
import { currentUser } from './middlewares/current-user';
import { trackRouter } from './routes/track/track.route';
import docs from './docs/swaggerDoc.json';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: false, // change later
}));

app.use(currentUser);

app.use('/api/track', trackRouter);
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(docs));

app.use("/heartbeat", express().get('/', (req: Request, res: Response) => {
    res.status( 200 ).send({
      status : "SUCCESS",
      message: "Heartbeat success."
    })
}));

app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };