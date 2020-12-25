import express, { Request, Response } from 'express';
import { UserService } from './user.service';

const router = express.Router();

router.get('/:userUUID/posts', async (req: Request, res: Response, next) => {
    const posts = await UserService.getUserPosts(req.params.userUUID);

    res.status(200).send(posts);
});

export { router as userRouter }