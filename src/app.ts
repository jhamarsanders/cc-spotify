import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError } from './errors/index';
import { errorHandler } from './middlewares/error-handler';
import { currentUser } from './middlewares/current-user';
import { authRouter } from './routes/auth/auth.route';
import { postsRouter } from './routes/posts/posts.route';
import { userRouter } from './routes/user/user.route';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: false, // change later
}));

app.use(currentUser);

app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);

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