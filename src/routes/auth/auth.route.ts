import express, { Request, Response } from 'express';
import { User } from '../../Models/User';
import { AuthService } from './auth.service';
import { currentUser } from '../../middlewares/current-user';

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
    const users = await User.query();

    res.send(users);
});

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await AuthService.login(email, password);

    req.session = {
        jwt: user.userJWT
    };

    delete user.userJWT;

    res.status(200).send(user);
});

router.post('/signup', async (req: Request, res: Response) => {
    const user = await AuthService.signup(req.body);

    req.session = {
        jwt: user.userJWT
    };

    delete user.userJWT;

    res.status(200).send(user);
});

router.post('/signout', (req, res) => {
    req.session = null;

    res.send({});
})

router.get('/current-user', currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as authRouter }