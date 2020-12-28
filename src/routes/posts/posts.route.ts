import express, { Request, Response } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { PostsService } from './posts.service';

const router = express.Router();

router.post('/', requireAuth, async(req: Request, res: Response, next) => {
    const post = await PostsService.createPost(req.body, req.currentUser!.uuid);

    res.status(200).send(post);
});

export { router as postsRouter }