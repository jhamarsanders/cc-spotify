import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { AuthService } from './auth.service';
import { currentUser } from '../../middlewares/current-user';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();

router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password.')
], validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await AuthService.login(email, password);

    req.session = {
        jwt: user.userJWT
    };

    delete user.userJWT;

    res.status(200).send(user);
});

router.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters.')
], validateRequest, async (req: Request, res: Response) => {

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